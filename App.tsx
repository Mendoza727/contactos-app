import React from "react";
import { AppProviders } from "@/app/providers/AppProviders";
import { AppNavigator } from "@/app/navigation/AppNavigator";

export default function App() {
    return (
      <AppProviders>
        <AppNavigator />
      </AppProviders>
    )
}