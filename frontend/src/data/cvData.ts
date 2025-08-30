export interface CVData {
  examinee_id: number;
  group_id: number;
  name: string;
  assessment_date: string;
  company: string;
  position: string;
  behavior_type_class: string;
  behavior_type_comment: string;
  ai_summary_comment: string;
  ai_stress_motive_comment: string;
  ai_relate_to_others_comment: string;
  time: number;
  analyzer_logical: number;
  controller_assertive: number;
  expressive_social: number;
  supporter_empathy: number;
  attention_to_detail: number;
  organization: number;
  confront_paperwork: number;
  assertive: number;
  competitive: number;
  self_esteem: number;
  confront_people: number;
  warm_and_sociable: number;
  talking: number;
  listening: number;
  appreciation: number;
  patience: number;
  social_initiative: number;
  // DISC Coordinates (-100 to 100)
  dominance_score: number;
  influence_score: number;
  steadiness_score: number;
  conscientiousness_score: number;
}

export interface DISCChartData {
  name: string;
  initials: string;
  x: number; // Dominance (positive) / Steadiness (negative)
  y: number; // Conscientiousness (positive) / Influence (negative)
  dominance: number;
  influence: number;
  steadiness: number;
  conscientiousness: number;
  id: number;
}

export const mockCVData: CVData[] = [
  {
    examinee_id: 1272902,
    group_id: 1272902,
    name: "Aisha Khan",
    assessment_date: "7/25/2025",
    company: "Hammerman, Graf, Hughes & Co., Inc.",
    position: "Internal Skills Assessments",
    behavior_type_class: "Conscientiousness & Steadiness",
    behavior_type_comment: "You have <b>Conscientiousness</b> and <b>Steadiness</b> behavior. You will tend to be interested in the pros and cons of decisions, being prepared and working toward consensus on issues.",
    ai_summary_comment: "<p><b>General:</b> You have a blend of <b>Conscientiousness</b> and <b>Steadiness</b> behavior, leading you to meticulously weigh the pros and cons of decisions, prioritize preparation, and seek consensus in group situations. Your conscientious nature drives you to critically evaluate all aspects before taking action, while your steadiness leans towards stability, balanced viewpoints, and harmonious outcomes.</p><p><b>Work Style:</b> Your personality traits suggest a preference for meticulous attention to detail, a balanced approach to organizing and planning, and a willingness to confront paperwork tasks. You may be inclined towards administrative or clerical roles that involve precision and organization. While you exhibit confidence in your abilities and a high degree of self-worth, you may lean towards shyness and discomfort with assertiveness or confrontation.</p><p><b>Communication:</b> In social interactions, you may feel uneasy in social settings and prefer to avoid small talk or engage in meaningful conversations. While you may be comfortable talking to others and occasionally talk compulsively, you also exhibit a strong inclination towards listening without interruptions, using it as a form of escape. Your optimistic and agreeable nature may sometimes lead you to overlook negatives, but your patience and tolerance for delays and mistakes can serve you well in delicate or cautious situations.</p>",
    ai_stress_motive_comment: "<h2>Personal Stressors</h2><ul><li>Uncomfortable social situations: You feel uncomfortable in social situations and tend to avoid them, causing stress.</li><li>High self-esteem: Your high self-worth may lead to overconfidence, which can be a stressor in some situations.</li><li>Talking excessively: Compulsive talking can be a source of stress, especially if it hinders effective communication.</li></ul><h2>Personal Motivators</h2><ul><li>Attention to detail: Your love for getting the fine points right can be a strong motivator for meticulous work.</li><li>Patience: Your tolerance for delays and mistakes can motivate you to handle situations delicately and cautiously.</li><li>Organization: Balancing organizing and spontaneity can motivate you to manage tasks effectively and maintain a well-structured approach.</li></ul>",
    ai_relate_to_others_comment: "<h1>Interactions with Other Personality Types</h1><ul><b><li>Conscientious and Dominant</b>: You will likely appreciate the methodical and thorough nature of the Conscientious and Dominant behavior. Both personalities value attention to detail and may work well together, but you may prefer consensus-building while they may lean towards asserting their leadership.</li><b><li>Conscientious</b>: Your shared Conscientiousness behavior suggests that you both value methodical approaches and attention to detail. Working together, you may focus on following rules and procedures diligently to achieve common goals, with a tendency to prioritize accuracy over emotions.</li><b><li>Conscientious and Steadiness</b>: With similar Conscientiousness and Steadiness behaviors, you are likely to find common ground in weighing the pros and cons of decisions, being well-prepared, and striving for consensus. Collaboration may involve thorough planning and consideration of different perspectives.</li><b><li>Steadiness</b>: When interacting with individuals of Steadiness behavior, you may appreciate their easy-going and caring nature. Your focus on preparedness and decision-making may complement their patience and desire to nurture relationships, fostering a harmonious dynamic.</li><b><li>Steadiness and Influence</b>: A blend of Steadiness and Influence behaviors can present opportunities for collaboration. Your preference for preparedness and consensus-building may align well with their focus on reconciliation, building friendships, and creating a positive social environment.</li><b><li>Influence</b>: Interacting with those exhibiting Influence behavior, you might find their sociable and extroverted nature intriguing. While you prioritize thoroughness and preparation, they may bring creativity and social skills to the table. Balancing attention to detail with their focus on presentation could lead to dynamic outcomes.</li><b><li>Dominance and Influence</b>: In engagement with Dominance and Influence personalities, you may encounter a mix of assertiveness and social orientation. While you emphasize preparedness and consensus, they might bring leadership and persuasive abilities. Finding common ground in decision-making and communication styles could enhance collaboration.</li><b><li>Dominance</b>: Your interactions with Dominance individuals may involve discussions around leadership, persuasion, and results-oriented actions. While you value deliberation and consensus, they might lean towards making quick decisions and taking charge. Recognizing each other's strengths can lead to effective collaboration.</li></ul>",
    time: 9,
    analyzer_logical: 71.0526,
    controller_assertive: 33.3333,
    expressive_social: 47.3684,
    supporter_empathy: 76.25,
    attention_to_detail: 75,
    organization: 50,
    confront_paperwork: 95,
    assertive: 29.1667,
    competitive: 25,
    self_esteem: 66.6667,
    confront_people: 27.7778,
    warm_and_sociable: 35.7143,
    talking: 66.6667,
    listening: 81.25,
    appreciation: 65,
    patience: 78.5714,
    social_initiative: 30,
    dominance_score: 25,
    influence_score: -40,
    steadiness_score: 65,
    conscientiousness_score: 75
  },
  {
    examinee_id: 1272903,
    group_id: 1272903,
    name: "Marcus Johnson",
    assessment_date: "7/26/2025",
    company: "TechFlow Solutions LLC",
    position: "Software Developer",
    behavior_type_class: "Dominance & Influence",
    behavior_type_comment: "You have <b>Dominance</b> and <b>Influence</b> behavior. You will tend to be results-oriented, confident, and socially engaging in your approach to work and relationships.",
    ai_summary_comment: "<p><b>General:</b> You demonstrate strong <b>Dominance</b> and <b>Influence</b> characteristics, making you naturally confident, results-driven, and socially adept. Your dominant traits push you toward leadership roles and quick decision-making, while your influence side helps you connect with others and build consensus through persuasion rather than authority.</p><p><b>Work Style:</b> You thrive in environments that offer challenges and opportunities to lead. Your high energy and competitive nature drive you to seek results quickly, sometimes at the expense of detailed planning. You prefer dynamic, fast-paced work environments where you can make an immediate impact and see tangible outcomes.</p><p><b>Communication:</b> You excel in social situations and are comfortable presenting ideas to groups. Your natural charisma and persuasive abilities make you effective at influencing others and building rapport. You tend to be optimistic and enthusiastic in your interactions, though you may sometimes overlook details in favor of the bigger picture.</p>",
    ai_stress_motive_comment: "<h2>Personal Stressors</h2><ul><li>Micromanagement: Being closely supervised or having limited autonomy can be highly stressful.</li><li>Slow-paced environments: Working in environments that lack urgency or quick decision-making can be frustrating.</li><li>Detailed paperwork: Having to focus extensively on administrative tasks or detailed documentation.</li></ul><h2>Personal Motivators</h2><ul><li>Leadership opportunities: Being able to take charge and guide teams or projects.</li><li>Recognition: Receiving acknowledgment for achievements and contributions.</li><li>Variety and challenge: Working on diverse, challenging projects that require creative problem-solving.</li></ul>",
    ai_relate_to_others_comment: "<h1>Interactions with Other Personality Types</h1><ul><li><b>Dominance</b>: Working with other dominant personalities may lead to power struggles, but can also result in highly productive, results-oriented partnerships when roles are clearly defined.</li><li><b>Influence</b>: Collaboration with other influential types can create dynamic, creative environments with excellent team morale and innovative solutions.</li><li><b>Steadiness</b>: Steady personalities can provide the stability and patience that complements your fast-paced nature, helping to ensure thorough implementation of ideas.</li><li><b>Conscientiousness</b>: Conscientious colleagues can help balance your big-picture thinking with attention to detail and systematic approaches to problem-solving.</li></ul>",
    time: 7,
    analyzer_logical: 45.2,
    controller_assertive: 85.5,
    expressive_social: 78.9,
    supporter_empathy: 40.1,
    attention_to_detail: 35,
    organization: 42,
    confront_paperwork: 25,
    assertive: 82.3,
    competitive: 88.7,
    self_esteem: 79.4,
    confront_people: 75.6,
    warm_and_sociable: 71.2,
    talking: 83.1,
    listening: 45.8,
    appreciation: 62.3,
    patience: 32.1,
    social_initiative: 85.9,
    dominance_score: 78,
    influence_score: 65,
    steadiness_score: -45,
    conscientiousness_score: -25
  },
  {
    examinee_id: 1272904,
    group_id: 1272904,
    name: "Sarah Chen",
    assessment_date: "7/27/2025",
    company: "Global Finance Corp",
    position: "Financial Analyst",
    behavior_type_class: "Conscientiousness",
    behavior_type_comment: "You have strong <b>Conscientiousness</b> behavior. You will tend to be analytical, detail-oriented, and methodical in your approach to work and problem-solving.",
    ai_summary_comment: "<p><b>General:</b> Your primary <b>Conscientiousness</b> behavior drives you to be highly analytical, systematic, and quality-focused. You naturally seek accuracy and precision in everything you do, preferring to thoroughly understand processes and requirements before taking action. Your methodical approach ensures consistent, high-quality results.</p><p><b>Work Style:</b> You excel in roles that require careful analysis, attention to detail, and systematic problem-solving. You prefer structured environments with clear procedures and standards. Your natural inclination toward thoroughness makes you particularly valuable in roles involving compliance, quality control, and complex data analysis.</p><p><b>Communication:</b> You tend to be thoughtful and measured in your communication, preferring to gather all relevant information before sharing opinions or making recommendations. You value accuracy over speed and appreciate when others provide detailed, well-researched information.</p>",
    ai_stress_motive_comment: "<h2>Personal Stressors</h2><ul><li>Rushed deadlines: Being pressured to complete work quickly without adequate time for thorough analysis.</li><li>Unclear requirements: Working with vague or constantly changing specifications and expectations.</li><li>Disorganized environments: Operating in chaotic settings without proper systems or procedures.</li></ul><h2>Personal Motivators</h2><ul><li>Quality standards: Opportunities to maintain high standards and produce excellent work.</li><li>Expertise recognition: Being valued for specialized knowledge and analytical skills.</li><li>Systematic processes: Working within well-defined, logical procedures and frameworks.</li></ul>",
    ai_relate_to_others_comment: "<h1>Interactions with Other Personality Types</h1><ul><li><b>Conscientiousness</b>: Working with other conscientious individuals creates highly efficient, quality-focused teams with shared values around accuracy and thoroughness.</li><li><b>Dominance</b>: Dominant personalities can provide direction and urgency, though conflicts may arise over pace and attention to detail.</li><li><b>Influence</b>: Influential colleagues can help present your analytical findings in engaging ways, though you may need to balance their optimism with realistic assessments.</li><li><b>Steadiness</b>: Steady personalities complement your analytical nature with patience and consistency, creating stable, reliable working relationships.</li></ul>",
    time: 12,
    analyzer_logical: 92.3,
    controller_assertive: 28.1,
    expressive_social: 31.4,
    supporter_empathy: 55.7,
    attention_to_detail: 95,
    organization: 88,
    confront_paperwork: 82,
    assertive: 22.5,
    competitive: 35.2,
    self_esteem: 68.9,
    confront_people: 18.7,
    warm_and_sociable: 29.3,
    talking: 38.1,
    listening: 87.4,
    appreciation: 72.6,
    patience: 91.2,
    social_initiative: 25.8,
    dominance_score: -15,
    influence_score: -35,
    steadiness_score: 20,
    conscientiousness_score: 88
  },
  {
    examinee_id: 1272905,
    group_id: 1272905,
    name: "David Rodriguez",
    assessment_date: "7/28/2025",
    company: "Creative Design Studio",
    position: "UX Designer",
    behavior_type_class: "Influence & Steadiness",
    behavior_type_comment: "You have <b>Influence</b> and <b>Steadiness</b> behavior. You will tend to be socially engaging while maintaining stability and harmony in relationships.",
    ai_summary_comment: "<p><b>General:</b> Your <b>Influence</b> and <b>Steadiness</b> combination makes you naturally collaborative, socially aware, and relationship-focused. You bring both enthusiasm and stability to teams, helping to build consensus while maintaining positive group dynamics.</p><p><b>Work Style:</b> You excel in collaborative environments where you can work closely with others. Your influence side helps you communicate ideas effectively and build rapport, while your steadiness ensures reliable, consistent performance and attention to team harmony.</p><p><b>Communication:</b> You're naturally gifted at reading social cues and adapting your communication style to different audiences. You prefer collaborative decision-making and excel at facilitating discussions that lead to consensus.</p>",
    ai_stress_motive_comment: "<h2>Personal Stressors</h2><ul><li>Conflict situations: Direct confrontation or hostile environments can be highly stressful.</li><li>Isolation: Working alone for extended periods without social interaction.</li><li>Rapid change: Sudden shifts in priorities or processes without adequate transition time.</li></ul><h2>Personal Motivators</h2><ul><li>Team collaboration: Working closely with others toward shared goals.</li><li>Positive feedback: Regular recognition and appreciation for contributions.</li><li>Stable relationships: Building long-term, trusting professional relationships.</li></ul>",
    ai_relate_to_others_comment: "<h1>Interactions with Other Personality Types</h1><ul><li><b>Dominance</b>: You can help dominant personalities consider team perspectives and build consensus, though you may need to assert your views more directly.</li><li><b>Influence</b>: Working with other influential types creates energetic, creative environments with strong team cohesion.</li><li><b>Steadiness</b>: Collaborating with steady personalities results in stable, harmonious working relationships with mutual support.</li><li><b>Conscientiousness</b>: Conscientious colleagues can provide the analytical depth that complements your people-focused approach.</li></ul>",
    time: 10,
    analyzer_logical: 55.3,
    controller_assertive: 42.1,
    expressive_social: 82.7,
    supporter_empathy: 88.4,
    attention_to_detail: 48,
    organization: 65,
    confront_paperwork: 52,
    assertive: 38.2,
    competitive: 31.5,
    self_esteem: 74.8,
    confront_people: 29.1,
    warm_and_sociable: 89.6,
    talking: 85.3,
    listening: 92.1,
    appreciation: 86.7,
    patience: 84.5,
    social_initiative: 78.9,
    dominance_score: -25,
    influence_score: 75,
    steadiness_score: 45,
    conscientiousness_score: -15
  },
  {
    examinee_id: 1272906,
    group_id: 1272906,
    name: "Emma Thompson",
    assessment_date: "7/29/2025",
    company: "Leadership Consulting",
    position: "Executive Coach",
    behavior_type_class: "Dominance",
    behavior_type_comment: "You have strong <b>Dominance</b> behavior. You will tend to be results-oriented, direct, and comfortable taking charge in challenging situations.",
    ai_summary_comment: "<p><b>General:</b> Your primary <b>Dominance</b> behavior drives you to be decisive, results-focused, and comfortable with leadership responsibilities. You naturally take charge in challenging situations and are motivated by achieving tangible outcomes and overcoming obstacles.</p><p><b>Work Style:</b> You thrive in environments that offer autonomy, challenge, and opportunities to lead. You prefer fast-paced settings where you can make quick decisions and see immediate results. You're comfortable with risk and often seek out new challenges.</p><p><b>Communication:</b> You communicate directly and concisely, preferring straightforward conversations focused on results and action. You may need to consciously slow down to ensure others have time to process and contribute to discussions.</p>",
    ai_stress_motive_comment: "<h2>Personal Stressors</h2><ul><li>Bureaucracy: Excessive rules, procedures, or slow decision-making processes.</li><li>Lack of control: Being micromanaged or having limited decision-making authority.</li><li>Routine tasks: Repetitive work without variety or challenge.</li></ul><h2>Personal Motivators</h2><ul><li>Leadership opportunities: Being able to direct projects and guide teams.</li><li>Challenging goals: Working toward ambitious, results-oriented objectives.</li><li>Autonomy: Having the freedom to make decisions and implement solutions.</li></ul>",
    ai_relate_to_others_comment: "<h1>Interactions with Other Personality Types</h1><ul><li><b>Dominance</b>: Working with other dominant personalities requires clear role definition to avoid power struggles, but can lead to highly productive outcomes.</li><li><b>Influence</b>: Influential colleagues can help you communicate vision more engagingly and build broader team buy-in.</li><li><b>Steadiness</b>: Steady team members provide stability and can help you consider the human impact of decisions.</li><li><b>Conscientiousness</b>: Conscientious colleagues ensure thorough analysis and quality control for your initiatives.</li></ul>",
    time: 8,
    analyzer_logical: 68.9,
    controller_assertive: 95.2,
    expressive_social: 51.3,
    supporter_empathy: 35.7,
    attention_to_detail: 42,
    organization: 58,
    confront_paperwork: 28,
    assertive: 92.1,
    competitive: 89.7,
    self_esteem: 87.3,
    confront_people: 88.4,
    warm_and_sociable: 45.2,
    talking: 72.8,
    listening: 48.6,
    appreciation: 55.1,
    patience: 31.2,
    social_initiative: 62.4,
    dominance_score: 85,
    influence_score: 15,
    steadiness_score: -65,
    conscientiousness_score: 25
  }
];

// Convert CV data to DISC chart format
export const getDISCChartData = (): DISCChartData[] => {
  return mockCVData.map(cv => ({
    name: cv.name,
    initials: cv.name.split(' ').map(n => n[0]).join(''),
    x: cv.dominance_score - cv.steadiness_score, // Dominance-Steadiness axis
    y: cv.conscientiousness_score - cv.influence_score, // Conscientiousness-Influence axis
    dominance: cv.dominance_score,
    influence: cv.influence_score,
    steadiness: cv.steadiness_score,
    conscientiousness: cv.conscientiousness_score,
    id: cv.examinee_id
  }));
};