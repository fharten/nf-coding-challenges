// pages/trigger-error.tsx
export default function TriggerErrorPage() {
  if (typeof window === 'undefined') {
    throw new Error('Server-side crash!');
  }

  return <div>Triggering error...</div>;
}
