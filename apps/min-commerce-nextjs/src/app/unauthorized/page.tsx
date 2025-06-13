"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #e11d48;
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <UnauthorizedContainer>
      <Title>Access Denied</Title>
      <Message>
        You do not have permission to access this page. Please sign in with an
        account that has the required permissions or contact your administrator
        if you believe this is an error.
      </Message>
      <Button onClick={() => router.push("/")}>Return to Home</Button>
    </UnauthorizedContainer>
  );
}
