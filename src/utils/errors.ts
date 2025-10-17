const extractErrorMessage = (err: any) => {
  // Handle network errors
  if (err.networkError) {
    if (err.networkError.code === "ECONNREFUSED") {
      return "Unable to connect to server. Please check your connection.";
    }
    if (err.networkError.statusCode === 500) {
      return "Server error. Please try again later.";
    }
    if (err.networkError.statusCode === 401) {
      return "Authentication failed. Please login again.";
    }
    if (err.networkError.statusCode === 403) {
      return "Access denied.";
    }
    return err.networkError.message || "Network error occurred.";
  }

  // Handle GraphQL errors
  if (err.graphQLErrors && err.graphQLErrors.length > 0) {
    const graphQLError = err.graphQLErrors[0];
    const errorMessage = graphQLError.extensions?.originalError?.message;

    if (errorMessage) {
      if (Array.isArray(errorMessage)) {
        return formatErrorMessage(errorMessage[0]);
      } else {
        return formatErrorMessage(errorMessage);
      }
    }

    // Fallback to GraphQL error message
    return formatErrorMessage(graphQLError.message);
  }

  // Handle regular errors structure (your original case)
  const errorMessage = err?.errors?.[0]?.extensions?.originalError?.message;
  if (errorMessage) {
    if (Array.isArray(errorMessage)) {
      return formatErrorMessage(errorMessage[0]);
    } else {
      return formatErrorMessage(errorMessage);
    }
  }

  // Handle regular error messages
  if (err?.errors?.[0]?.message) {
    return formatErrorMessage(err.errors[0].message);
  }

  // Final fallback
  return err.message
    ? formatErrorMessage(err.message)
    : "An unknown error occurred.";
};

const formatErrorMessage = (errorMessage: string) => {
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

export { extractErrorMessage };
