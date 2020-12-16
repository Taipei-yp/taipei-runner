import { Component, ErrorInfo, ReactElement } from "react";

interface Props {
  content: ReactElement;
  errorContent: ReactElement;
}

interface State {
  hasError: boolean;
}

// eslint-disable-next-line react/prefer-stateless-function
export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`У нас ошибка! ${error.message}`, errorInfo.componentStack);
  }

  render() {
    const { content, errorContent } = this.props;
    const { hasError } = this.state;

    return hasError ? errorContent : content;
  }
}
