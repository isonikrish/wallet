import { useState, useCallback } from "react";
import { Alert } from "react-native";
const API_URL = "http://localhost:5001/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
      setTransactions([]);
    }
  }, [userId]);
  const fetchSummary = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await res.json();
      setSummary(data);
    } catch (error) {
      console.error(error);
      setSummary([]);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id) => {
    try {
      const res = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete transaction");

      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Failed to deleting transactions");
      Alert.alert("Error", error.msg);
    }
  };

  return {
    transactions,
    summary,
    deleteTransaction,
    isLoading,
    loadData,
  };
};
