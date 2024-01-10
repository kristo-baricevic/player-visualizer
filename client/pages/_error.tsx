// pages/_error.tsx
import React from 'react';
import { NextPage, NextPageContext } from 'next';

interface ErrorProps {
  statusCode: number | null;
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on the client'}
    </p>
  );
};

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext): Promise<ErrorProps> => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? null;
  return { statusCode };
};

export default ErrorPage;
