const LEETCODE_GRAPHQL_URL = process.env.LEETCODE_URL;
const DEFAULT_USER_SLUG = process.env.PROFILE_NAME;
const CACHE_DURATION_MS = 5 * 60 * 1000;

const USER_QUESTION_PROGRESS_QUERY = `
  query userProfileUserQuestionProgressV2($userSlug: String!) {
    userProfileUserQuestionProgressV2(userSlug: $userSlug) {
      numAcceptedQuestions { count difficulty }
      numFailedQuestions { count difficulty }
      numUntouchedQuestions { count difficulty }
      userSessionBeatsPercentage { difficulty percentage }
      totalQuestionBeatsPercentage
    }
  }
`;

const RECENT_AC_SUBMISSIONS_QUERY = `
  query recentAcSubmissions($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      id
      title
      titleSlug
      timestamp
    }
  }
`;

let cachedStats = null;

const getCount = (questions, difficulty) =>
  questions.find((question) => question.difficulty === difficulty)?.count || 0;

const getTotal = (questions) =>
  questions.reduce((total, question) => total + question.count, 0);

const fetchLeetCodeStats = async (userSlug) => {
  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "https://leetcode.com",
      Referer: "https://leetcode.com/",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({
      operationName: "userProfileUserQuestionProgressV2",
      query: USER_QUESTION_PROGRESS_QUERY,
      variables: { userSlug },
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`LeetCode API failed: ${response.status}`);
  }

  const result = await response.json();
  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join(", "));
  }

  const progress = result.data?.userProfileUserQuestionProgressV2;
  if (!progress) {
    throw new Error("LeetCode profile data not found");
  }

  const acceptedQuestions = progress.numAcceptedQuestions || [];
  const failedQuestions = progress.numFailedQuestions || [];
  const untouchedQuestions = progress.numUntouchedQuestions || [];

  return {
    username: userSlug,
    totalSolved: getTotal(acceptedQuestions),
    easySolved: getCount(acceptedQuestions, "EASY"),
    mediumSolved: getCount(acceptedQuestions, "MEDIUM"),
    hardSolved: getCount(acceptedQuestions, "HARD"),
    acceptedQuestions,
    failedQuestions,
    untouchedQuestions,
    beatsPercentage: progress.userSessionBeatsPercentage || [],
    totalQuestionBeatsPercentage: progress.totalQuestionBeatsPercentage,
    lastUpdated: new Date().toISOString(),
  };
};

const fetchLatestSolvedQuestions = async (username) => {
  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "https://leetcode.com",
      Referer: "https://leetcode.com/",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({
      operationName: "recentAcSubmissions",
      query: RECENT_AC_SUBMISSIONS_QUERY,
      variables: { username, limit: 10 },
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`LeetCode API failed: ${response.status}`);
  }

  const result = await response.json();
  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join(", "));
  }

  const submissions = result.data?.recentAcSubmissionList;
  if (!submissions) {
    throw new Error("Recent submissions not found");
  }

  return submissions.map((submission) => ({
    id: submission.id,
    title: submission.title,
    titleSlug: submission.titleSlug,
    timestamp: Number(submission.timestamp),
    solvedAt: new Date(Number(submission.timestamp) * 1000).toISOString(),
  }));
};

export const leetCodeStats = async (req, res) => {
  const userSlug = req.query.username || DEFAULT_USER_SLUG;

  if (!/^[a-zA-Z0-9_-]{1,50}$/.test(userSlug)) {
    return res.status(400).json({ error: "Invalid LeetCode username" });
  }

  if (
    cachedStats?.username === userSlug &&
    Date.now() - cachedStats.cachedAt < CACHE_DURATION_MS
  ) {
    return res.status(200).json(cachedStats.data);
  }

  try {
    const [statsResult, recentQuestionsResult] = await Promise.allSettled([
      fetchLeetCodeStats(userSlug),
      fetchLatestSolvedQuestions(userSlug),
    ]);
    if (statsResult.status === "rejected") {
      throw statsResult.reason;
    }

    const stats = statsResult.value;
    const recentSolvedQuestions =
      recentQuestionsResult.status === "fulfilled"
        ? recentQuestionsResult.value
        : [];

    if (recentQuestionsResult.status === "rejected") {
      console.error(
        "Error fetching recent LeetCode submissions:",
        recentQuestionsResult.reason.message,
      );
    }

    const data = { ...stats, recentSolvedQuestions };
    cachedStats = { username: userSlug, cachedAt: Date.now(), data };
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error.message);
    return res.status(502).json({
      error: "Unable to load LeetCode stats right now",
      message: error.message,
    });
  }
};
