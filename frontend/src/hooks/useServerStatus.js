import { useState, useEffect, useCallback } from "react";
import { wakeup } from "../services/api";

export const useServerStatus = () => {
  const [serverAwake, setServerAwake] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [assistantAccessGranted, setAssistantAccessGranted] = useState(false);

  // Check localStorage for persistent access state
  useEffect(() => {
    const granted = localStorage.getItem("assistantAccessGranted") === "true";
    setAssistantAccessGranted(granted);
  }, []);

  // Initialize server wakeup
  const initializeServer = useCallback(async () => {
    setIsChecking(true);
    try {
      const response = await wakeup();
      const isAwake = response && response.success;
      setServerAwake(isAwake);

      // Also set global window variable for compatibility
      window.serverAwake = isAwake;
    } catch (error) {
      console.error("Server wakeup error:", error);
      setServerAwake(false);
      window.serverAwake = false;
    } finally {
      setIsChecking(false);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeServer();

    // Set up periodic checks (every minute)
    const interval = setInterval(initializeServer, 60000);

    return () => clearInterval(interval);
  }, [initializeServer]);

  const grantAssistantAccess = useCallback(() => {
    setAssistantAccessGranted(true);
    localStorage.setItem("assistantAccessGranted", "true");
    window.assistantAccessGranted = true;
  }, []);

  const revokeAssistantAccess = useCallback(() => {
    setAssistantAccessGranted(false);
    localStorage.removeItem("assistantAccessGranted");
    window.assistantAccessGranted = false;
  }, []);

  const getServerStatus = useCallback(() => {
    return {
      isAwake: serverAwake,
      isChecking,
      statusColor: serverAwake ? "#7cf77c" : "#ff4444",
      statusText: serverAwake ? "Active" : "Server Loading...",
    };
  }, [serverAwake, isChecking]);

  return {
    serverAwake,
    isChecking,
    assistantAccessGranted,
    grantAssistantAccess,
    revokeAssistantAccess,
    getServerStatus,
    recheck: initializeServer,
  };
};
