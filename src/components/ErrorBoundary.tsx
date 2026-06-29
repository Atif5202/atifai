import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="p-4 rounded-full bg-rose-500/10 text-rose-500 mb-4">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Une erreur est survenue
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md">
            {this.state.error?.message || "Un problème inattendu s'est produit."}
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 dark:bg-cyan-500 text-white text-sm font-semibold hover:bg-blue-700 dark:hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
