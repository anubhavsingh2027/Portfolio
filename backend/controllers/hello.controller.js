
export const wakeup = async (req, res) => {
return res.status(200).json({
        success: true,
        message: "Now backend working",
      });
};



