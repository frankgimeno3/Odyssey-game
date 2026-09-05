import { notFound } from "next/navigation";
import { getStageFromRoute } from "../../stageRoutes";
import { GermanQuestionnaire } from "../Questionnaire";

export default async function GermanStagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: routeStage } = await params;
  const initialStage = getStageFromRoute(routeStage);
  if (!initialStage) notFound();
  return <GermanQuestionnaire initialStage={initialStage} />;
}
