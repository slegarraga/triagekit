import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

/**
 * Top-level error boundary: a render crash shows a friendly fallback with a
 * retry instead of a white screen. "Try again" remounts the app content by
 * clearing the recorded error; React re-renders from scratch.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep it in the console for anyone who opened devtools; the UI stays friendly.
    console.error('Unhandled render error:', error, info.componentStack)
  }

  private readonly retry = () => this.setState({ error: null })

  render() {
    if (this.state.error) {
      return (
        <main className="bg-black min-h-screen flex items-center justify-center p-6">
          <div className="card max-w-md w-full space-y-4 p-8 text-center">
            <h1 className="text-xl font-semibold text-gray-100">Something went wrong</h1>
            <p className="text-sm text-gray-400">
              An unexpected error occurred while rendering. Your work is safe to retry.
            </p>
            <button type="button" className="btn-primary w-full" onClick={this.retry}>
              Try again
            </button>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}
