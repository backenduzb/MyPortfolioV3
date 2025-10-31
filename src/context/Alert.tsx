"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AlertType = "success" | "error" | "info";

type Alert = {
  id: string;
  message: string;
  type: AlertType;
  duration: number;
  isVisible: boolean;
};

type AlertContextType = {
  alerts: Alert[];
  showAlert: (msg: string, duration?: number) => void;
  showSuccess: (msg: string, duration?: number) => void;
  showError: (msg: string, duration?: number) => void;
  hideAlert: (id: string) => void;
  hideAllAlerts: () => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const getAlertType = (message: string): AlertType => {
    if (message.includes("❌") || message.includes("✖") || message.includes("⚠") || message.toLowerCase().includes("error")) {
      return "error";
    } else if (message.includes("✅") || message.includes("✓") || message.includes("✔") || message.toLowerCase().includes("success")) {
      return "success";
    }
    return "info";
  };

  const showAlert = (msg: string, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const type = getAlertType(msg);

    const newAlert: Alert = {
      id,
      message: msg,
      type,
      duration,
      isVisible: true,
    };

    setAlerts(prev => [...prev, newAlert]);

    if (duration > 0) {
      setTimeout(() => {
        hideAlert(id);
      }, duration);
    }
  };

  const showSuccess = (msg: string, duration = 3000) => {
    showAlert(`✅ ${msg}`, duration);
  };

  const showError = (msg: string, duration = 4000) => {
    showAlert(`❌ ${msg}`, duration);
  };

  const hideAlert = (id: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, isVisible: false } : alert
    ));

    // Remove from state after animation
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 600);
  };

  const hideAllAlerts = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isVisible: false })));
    setTimeout(() => {
      setAlerts([]);
    }, 600);
  };

  return (
    <AlertContext.Provider value={{
      alerts,
      showAlert,
      showSuccess,
      showError,
      hideAlert,
      hideAllAlerts
    }}>
      {children}

      {/* Alerts Container */}
      <div className="fixed bottom-5 right-5 z-50 space-y-3">
        {alerts.map((alert, index) => (
          <AlertItem
            key={alert.id}
            alert={alert}
            onClose={() => hideAlert(alert.id)}
            index={index}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
}
function AlertItem({ alert, onClose, index }: {
  alert: Alert;
  onClose: () => void;
  index: number;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const getAlertStyles = () => {
    const baseStyles = "border px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 backdrop-blur-[3px] min-w-[300px] ";

    switch (alert.type) {
      case "success":
        return baseStyles + "border-green-500 bg-black/20 text-green-100";
      case "error":
        return baseStyles + "border-red-500 border-[0.5px]  bg-black/20 text-red-100";
      case "info":
      default:
        return baseStyles + "border-blue-500 bg-blue-500/20 text-blue-100";
    }
  };

  const getButtonStyles = () => {
    switch (alert.type) {
      case "success":
        return "text-green-300 hover:text-green-100 hover:bg-green-500/30";
      case "error":
        return "text-red-300 hover:text-red-100 hover:bg-red-500/30";
      case "info":
      default:
        return "text-blue-300 hover:text-blue-100 hover:bg-blue-500/30";
    }
  };

  const getIcon = () => {
    switch (alert.type) {
      case "success":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
        );
      case "error":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        );
      case "info":
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-out max-w-100
        ${alert.isVisible && isMounted
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
        }
      `}
      style={{
        transform: `translateY(${index * -8}px)`,
        zIndex: 1000 - index,
      }}
    >
      <div className={getAlertStyles()}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex-shrink-0">{getIcon()}</span>
            <span className="text-white font-medium">{alert.message}</span>
          </div>
          <button
            className={`p-1 absolute top-2 right-2 rounded-full transition-colors ${getButtonStyles()}`}
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
              <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
              <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert faqat AlertProvider ichida ishlaydi!");
  return ctx;
}