"use client";
import React from "react";

import { useAuthStore } from "@/store/auth";

function FeedPage() {
  const authData = useAuthStore();

  console.log(authData);
 

  return <div>feedPage</div>;
}

export default FeedPage;
