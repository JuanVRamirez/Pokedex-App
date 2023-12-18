import React from "react";
import { View, Text } from "react-native";
import LoginForm from "../src/components/Auth/LoginForm";
import UserData from "../src/components/Auth/UserData";
import useAuth from "../src/hooks/useAuth";

export default function Account() {
  const { auth } = useAuth();
  return <View>{auth ? <UserData /> : <LoginForm />}</View>;
}
