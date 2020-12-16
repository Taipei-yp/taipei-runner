import React from "react";

interface Props {
  content?: React.ReactElement;
  errorContent?: React.ReactElement;
}

interface State {
  isError: boolean;
}

// eslint-disable-next-line react/prefer-stateless-function
class ErrorBoundary extends React.Component<Props, State> {
  state = {
    isError: false,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn(`У нас ошибка! ${error.message}`, errorInfo.componentStack);
  }

  static getDerivedStateFromError() {
    return {
      isError: true,
    };
  }

  render() {
    const { content, errorContent } = this.props;
    const { isError } = this.state;

    return <>{isError ? errorContent : content}</>;
  }
}

export default ErrorBoundary;
