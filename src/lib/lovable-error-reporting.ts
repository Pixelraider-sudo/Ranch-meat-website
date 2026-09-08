type LovableErrorContext = Record<string, unknown>;

export function reportLovableError(error: unknown, context?: LovableErrorContext): void {
  if (context && Object.keys(context).length > 0) {
    console.error("Lovable error report:", context, error);
    return;
  }

  console.error("Lovable error report:", error);
}
