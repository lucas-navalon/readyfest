export default function FeedbackMessage({ feedback }) {
  if (!feedback.text) {
    return null;
  }

  return <div className={`alert ${feedback.type}`}>{feedback.text}</div>;
}
