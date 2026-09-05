import { notFound } from "next/navigation";
import { getStageFromRoute } from "../../stageRoutes";
import { SpanishQuestionnaire } from "../Questionnaire";

export default async function SpanishStagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: routeStage } = await params;
  const initialStage = getStageFromRoute(routeStage);
  if (!initialStage) notFound();
  return <SpanishQuestionnaire initialStage={initialStage} />;
}
