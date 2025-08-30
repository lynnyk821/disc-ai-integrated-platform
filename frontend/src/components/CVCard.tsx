import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { CVData } from "../data/cvData";

interface CVCardProps {
  cvData: CVData;
}

export function CVCard({ cvData }: CVCardProps) {
  const behavioralMetrics = [
    { label: "Analyzer/Logical", value: cvData.analyzer_logical },
    { label: "Controller/Assertive", value: cvData.controller_assertive },
    { label: "Expressive/Social", value: cvData.expressive_social },
    { label: "Supporter/Empathy", value: cvData.supporter_empathy },
    { label: "Attention to Detail", value: cvData.attention_to_detail },
    { label: "Organization", value: cvData.organization },
    { label: "Confront Paperwork", value: cvData.confront_paperwork },
    { label: "Assertive", value: cvData.assertive },
    { label: "Competitive", value: cvData.competitive },
    { label: "Self Esteem", value: cvData.self_esteem },
    { label: "Confront People", value: cvData.confront_people },
    { label: "Warm and Sociable", value: cvData.warm_and_sociable },
    { label: "Talking", value: cvData.talking },
    { label: "Listening", value: cvData.listening },
    { label: "Appreciation", value: cvData.appreciation },
    { label: "Patience", value: cvData.patience },
    { label: "Social Initiative", value: cvData.social_initiative }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    if (score >= 40) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-6">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-2xl">{cvData.name}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{cvData.behavior_type_class}</Badge>
            <Badge variant="secondary">{cvData.assessment_date}</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Company:</span>
            <p>{cvData.company}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Position:</span>
            <p>{cvData.position}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Assessment Time:</span>
            <p>{cvData.time} minutes</p>
          </div>
          <div>
            <span className="text-muted-foreground">Candidate ID:</span>
            <p>{cvData.examinee_id}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Behavior Type Comment */}
        <div>
          <h3 className="mb-3">Behavior Overview</h3>
          <div 
            className="prose prose-sm max-w-none bg-muted/50 p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: cvData.behavior_type_comment }}
          />
        </div>

        <Separator />

        {/* AI Summary */}
        <div>
          <h3 className="mb-3">AI Assessment Summary</h3>
          <div 
            className="prose prose-sm max-w-none bg-blue-50 p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: cvData.ai_summary_comment }}
          />
        </div>

        <Separator />

        {/* Stress & Motivators */}
        <div>
          <h3 className="mb-3">Stress Factors & Motivators</h3>
          <div 
            className="prose prose-sm max-w-none bg-amber-50 p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: cvData.ai_stress_motive_comment }}
          />
        </div>

        <Separator />

        {/* Team Interactions */}
        <div>
          <h3 className="mb-3">Team Interaction Insights</h3>
          <div 
            className="prose prose-sm max-w-none bg-green-50 p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: cvData.ai_relate_to_others_comment }}
          />
        </div>

        <Separator />

        {/* Behavioral Metrics Table */}
        <div>
          <h3 className="mb-4">Behavioral Assessment Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {behavioralMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                <Badge className={getScoreColor(metric.value)}>
                  {metric.value.toFixed(1)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}