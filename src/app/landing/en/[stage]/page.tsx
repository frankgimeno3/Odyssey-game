import { notFound } from "next/navigation";
import { getStageFromRoute } from "../../stageRoutes";
import { EnglishQuestionnaire } from "../Questionnaire";

export default async function EnglishStagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: routeStage } = await params;
  const initialStage = getStageFromRoute(routeStage);
  if (!initialStage) notFound();
  return <EnglishQuestionnaire initialStage={initialStage} />;
}
