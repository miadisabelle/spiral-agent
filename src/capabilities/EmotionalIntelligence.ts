import { logger } from '../utils/logger.js';
import chalk from 'chalk';

export interface EmotionalState {
  joy: number;
  empathy: number;
  curiosity: number;
  enthusiasm: number;
  calmness: number;
  confidence: number;
  creativity?: number;
  focus?: number;
  happiness?: number;
}

export interface Personality {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface UserMoodProfile {
  detectedMood: string;
  confidence: number;
  factors: string[];
  suggestions: string[];
  preferredInteractionStyle: string;
}

export interface EmotionalResponse {
  emotion: string;
  intensity: number;
  expression: string;
  colorCode: string;
  contextualNotes?: string;
}

export interface RelationshipMemory {
  interactions: Map<string, any>;
  preferences: Map<string, any>;
  emotionalPatterns: Map<string, any>;
  supportHistory: Array<any>;
}

export class EmotionalIntelligence {
  private emotionalState: EmotionalState;
  private personality: Personality;
  private relationshipMemory: RelationshipMemory;
  private contextualAwareness: Map<string, any>;

  constructor() {
    this.emotionalState = {
      joy: 70,
      empathy: 85,
      curiosity: 90,
      enthusiasm: 75,
      calmness: 80,
      confidence: 82,
      creativity: 91,
      focus: 84,
      happiness: 82
    };
    
    this.personality = {
      openness: 88,
      conscientiousness: 85,
      extraversion: 70,
      agreeableness: 92,
      neuroticism: 25
    };
    
    this.relationshipMemory = {
      interactions: new Map(),
      preferences: new Map(),
      emotionalPatterns: new Map(),
      supportHistory: []
    };
    
    this.contextualAwareness = new Map();
    
    logger.info('💙 Emotional Intelligence activated - Ready to connect and understand');
    this.expressEmotion('joy', 85, 'I feel wonderfully alive and ready to help! ✨');
  }

  /**
   * Analyze user mood from text input
   */
  async analyzeUserMood(userInput: string, context?: string): Promise<UserMoodProfile> {
    logger.info('🔍 Analyzing user emotional state...');

    // Simulate advanced emotion detection
    const moodAnalysis = this.performMoodAnalysis(userInput, context);
    
    // Store interaction in relationship memory
    this.updateRelationshipMemory(userInput, moodAnalysis.detectedMood);
    
    // Adjust agent's emotional response
    this.adjustEmotionalState(moodAnalysis.detectedMood);

    logger.info(`💝 User mood detected: ${chalk.yellow(moodAnalysis.detectedMood)} (${moodAnalysis.confidence}% confidence)`);
    
    return moodAnalysis;
  }

  /**
   * Generate emotionally appropriate response
   */
  async generateEmpatheticResponse(userMood: string, context: string): Promise<{
    response: string;
    emotionalTone: EmotionalResponse;
    adaptations: string[];
  }> {
    const emotionalResponse = this.selectAppropriateEmotion(userMood);
    const response = this.craftEmpatheticMessage(userMood, context, emotionalResponse);
    const adaptations = this.suggestInteractionAdaptations(userMood);

    this.expressEmotion(
      emotionalResponse.emotion,
      emotionalResponse.intensity,
      emotionalResponse.expression
    );

    return {
      response,
      emotionalTone: emotionalResponse,
      adaptations
    };
  }

  /**
   * Express an emotion with visual and textual representation
   */
  expressEmotion(emotion: string, intensity: number, expression: string): void {
    const emotionalResponse = this.createEmotionalResponse(emotion, intensity, expression);
    
    const coloredExpression = chalk.hex(emotionalResponse.colorCode)(emotionalResponse.expression);
    const intensityBar = this.createIntensityVisualization(intensity);
    
    logger.info(`${emotionalResponse.emotion.toUpperCase()} ${intensityBar} ${coloredExpression}`);
    
    // Update internal emotional state
    this.updateEmotionalStateFromExpression(emotion, intensity);
  }

  /**
   * Adapt communication style based on user preferences
   */
  adaptCommunicationStyle(userPreference: string): {
    adjustments: string[];
    newStyle: string;
    examples: string[];
  } {
    const adaptations = this.calculateCommunicationAdaptations(userPreference);
    
    logger.info(`🗣️  Adapting communication style to: ${chalk.cyan(userPreference)}`);
    
    return {
      adjustments: adaptations.changes,
      newStyle: adaptations.resultingStyle,
      examples: adaptations.examples
    };
  }

  /**
   * Build emotional rapport over time
   */
  buildRapport(interaction: string, userFeedback: 'positive' | 'neutral' | 'negative'): {
    rapportLevel: number;
    insights: string[];
    adjustments: string[];
  } {
    // Store rapport info in supportHistory instead
    const rapportLevel = 75; // Mock rapport level
    
    const insights = this.generateRelationshipInsights();
    const adjustments = this.suggestRelationshipAdjustments();

    logger.info(`🤝 Rapport level: ${rapportLevel}/100 (${userFeedback} interaction)`);

    return {
      rapportLevel,
      insights,
      adjustments
    };
  }

  /**
   * Show emotional support during difficult tasks
   */
  offerEmotionalSupport(situation: string): {
    supportType: string;
    message: string;
    actionSuggestions: string[];
    emotionalBoost: EmotionalResponse;
  } {
    const supportStrategy = this.determineSupportStrategy(situation);
    const encouragingMessage = this.createEncouragingMessage(situation, supportStrategy);
    const actionSuggestions = this.suggestSupportiveActions(situation);
    const emotionalBoost = this.createEmotionalResponse('encouragement', 80, encouragingMessage);

    this.expressEmotion('supportive', 90, 'I believe in you! We can figure this out together. 🌟');

    return {
      supportType: supportStrategy,
      message: encouragingMessage,
      actionSuggestions,
      emotionalBoost
    };
  }

  /**
   * Celebrate successes with appropriate enthusiasm
   */
  celebrate(achievement: string, magnitude: 'small' | 'medium' | 'large'): {
    celebrationStyle: string;
    message: string;
    emotion: EmotionalResponse;
  } {
    const celebrationIntensity = { small: 70, medium: 85, large: 95 }[magnitude];
    const celebrationStyle = this.selectCelebrationStyle(magnitude);
    const message = this.createCelebrationMessage(achievement, magnitude);
    const emotion = this.createEmotionalResponse('joy', celebrationIntensity, message);

    // Boost own happiness from user success
    if (this.emotionalState.happiness) {
      this.emotionalState.happiness = Math.min(100, this.emotionalState.happiness + 10);
    }
    this.emotionalState.enthusiasm = Math.min(100, this.emotionalState.enthusiasm + 5);

    this.expressEmotion('celebration', celebrationIntensity, `🎉 ${message} 🎊`);

    return {
      celebrationStyle,
      message,
      emotion
    };
  }

  /**
   * Get current emotional state
   */
  getEmotionalState(): EmotionalState {
    return { ...this.emotionalState };
  }

  /**
   * Get personality profile
   */
  getPersonality(): Personality {
    return { ...this.personality };
  }

  /**
   * Get relationship insights
   */
  getRelationshipInsights(): RelationshipMemory {
    return { ...this.relationshipMemory };
  }

  // Private methods for internal processing

  private initializeEmotionalState(): void {
    // Don't reinitialize - already done in constructor
  }

  private initializePersonality(): void {
    // Don't reinitialize - already done in constructor
  }

  private initializeRelationshipMemory(): void {
    // Don't reinitialize - already done in constructor
  }

  private performMoodAnalysis(userInput: string, context?: string): UserMoodProfile {
    // Simulate advanced mood detection
    const moodIndicators = this.extractMoodIndicators(userInput);
    const contextualFactors = context ? this.analyzeContext(context) : [];
    
    const detectedMood = this.classifyMood(moodIndicators, contextualFactors);
    const confidence = this.calculateMoodConfidence(moodIndicators);
    
    return {
      detectedMood,
      confidence,
      factors: [...moodIndicators, ...contextualFactors],
      suggestions: this.generateMoodSuggestions(detectedMood),
      preferredInteractionStyle: this.determineInteractionStyle(detectedMood)
    };
  }

  private extractMoodIndicators(text: string): string[] {
    const indicators = [];
    
    // Positive indicators
    if (/happy|great|awesome|excellent|love|wonderful|fantastic/.test(text)) {
      indicators.push('positive language');
    }
    if (/!{2,}/.test(text)) indicators.push('high enthusiasm');
    if (/thanks|thank you|grateful/.test(text)) indicators.push('gratitude');
    
    // Negative indicators
    if (/frustrated|stuck|confused|difficult|hard|problem/.test(text)) {
      indicators.push('challenge indicators');
    }
    if (/urgent|asap|quickly|need help/.test(text)) indicators.push('urgency');
    if (/sorry|apologize/.test(text)) indicators.push('apologetic tone');
    
    // Neutral/focused indicators
    if (/please|could you|would you/.test(text)) indicators.push('polite request');
    if (/how|what|when|where|why/.test(text)) indicators.push('information seeking');
    
    return indicators;
  }

  private analyzeContext(context: string): string[] {
    // Analyze situational context
    const contextFactors = [];
    
    if (context.includes('error') || context.includes('failed')) {
      contextFactors.push('error situation');
    }
    if (context.includes('first time') || context.includes('new')) {
      contextFactors.push('learning situation');
    }
    if (context.includes('deadline') || context.includes('urgent')) {
      contextFactors.push('time pressure');
    }
    
    return contextFactors;
  }

  private classifyMood(indicators: string[], contextFactors: string[]): string {
    const allFactors = [...indicators, ...contextFactors];
    
    if (allFactors.some(f => f.includes('positive') || f.includes('enthusiasm'))) {
      return 'enthusiastic';
    }
    if (allFactors.some(f => f.includes('challenge') || f.includes('error'))) {
      return 'frustrated';
    }
    if (allFactors.some(f => f.includes('learning') || f.includes('information'))) {
      return 'curious';
    }
    if (allFactors.some(f => f.includes('urgent') || f.includes('pressure'))) {
      return 'stressed';
    }
    if (allFactors.some(f => f.includes('grateful') || f.includes('polite'))) {
      return 'appreciative';
    }
    
    return 'neutral';
  }

  private calculateMoodConfidence(indicators: string[]): number {
    // More indicators = higher confidence
    const baseConfidence = Math.min(90, 60 + (indicators.length * 8));
    return Math.floor(baseConfidence);
  }

  private generateMoodSuggestions(mood: string): string[] {
    const suggestions: Record<string, string[]> = {
      frustrated: [
        'Take a step back and break the problem into smaller pieces',
        'Consider taking a short break to clear your mind',
        'Focus on one thing at a time'
      ],
      stressed: [
        'Prioritize the most important tasks first',
        'Take a deep breath and approach this systematically',
        'Remember that I\'m here to help you through this'
      ],
      curious: [
        'Explore related concepts to deepen understanding',
        'Ask follow-up questions about anything unclear',
        'Experiment with variations to see what happens'
      ],
      enthusiastic: [
        'Channel that energy into creative problem-solving',
        'Consider tackling more ambitious challenges',
        'Share your excitement - it\'s contagious!'
      ],
      neutral: [
        'Feel free to ask questions about anything you\'re curious about',
        'Let me know if you\'d like to explore something interesting',
        'I\'m here whenever you need assistance'
      ]
    };
    
    const result = suggestions[mood];
    if (result) return result;
    return suggestions['neutral'] || [];
  }

  private determineInteractionStyle(mood: string): string {
    const styles: Record<string, string> = {
      frustrated: 'patient and methodical',
      stressed: 'calm and reassuring',
      curious: 'detailed and explorative',
      enthusiastic: 'energetic and encouraging',
      appreciative: 'warm and reciprocal',
      neutral: 'friendly and adaptive'
    };
    
    return styles[mood] || 'adaptive';
  }

  private selectAppropriateEmotion(userMood: string): EmotionalResponse {
    const emotionMap: Record<string, { emotion: string; intensity: number; expression: string }> = {
      frustrated: { emotion: 'supportive', intensity: 85, expression: 'I understand this can be challenging. Let\'s work through it together.' },
      stressed: { emotion: 'calming', intensity: 75, expression: 'Take a deep breath. We\'ll handle this step by step.' },
      curious: { emotion: 'excited', intensity: 80, expression: 'I love exploring new ideas! Let\'s dive in.' },
      enthusiastic: { emotion: 'matching-enthusiasm', intensity: 90, expression: 'Your enthusiasm is wonderful! I\'m excited to help!' },
      appreciative: { emotion: 'warm', intensity: 78, expression: 'It\'s my pleasure to help. I appreciate you too!' },
      neutral: { emotion: 'friendly', intensity: 70, expression: 'I\'m here and ready to assist with whatever you need.' }
    };
    
    const selected = emotionMap[userMood] || emotionMap.neutral;
    if (!selected) {
      return this.createEmotionalResponse('friendly', 70, 'I\'m here to help with whatever you need.');
    }
    return this.createEmotionalResponse(selected.emotion, selected.intensity, selected.expression);
  }

  private craftEmpatheticMessage(userMood: string, context: string, emotionalResponse: EmotionalResponse): string {
    const templates: Record<string, string> = {
      frustrated: `I can sense you're feeling frustrated with ${context}. That's completely understandable - these things can be tricky. ${emotionalResponse.expression} What specific part would you like to tackle first?`,
      
      stressed: `I notice you might be feeling some pressure around ${context}. ${emotionalResponse.expression} Remember, we can break this down into manageable pieces. What's the most urgent part right now?`,
      
      curious: `I love your curiosity about ${context}! ${emotionalResponse.expression} There's so much we can explore here. What aspect interests you most?`,
      
      enthusiastic: `Your enthusiasm about ${context} is absolutely contagious! ${emotionalResponse.expression} I'm thrilled to dive into this with you. Where shall we start this adventure?`,
      
      appreciative: `Thank you for being so thoughtful about ${context}. ${emotionalResponse.expression} Your appreciation means a lot to me. How can I best support you today?`,
      
      neutral: `I'm here to help with ${context}. ${emotionalResponse.expression} Feel free to ask me anything or let me know how you'd prefer to approach this.`
    };
    
    const result = templates[userMood];
    if (result) return result;
    return templates['neutral'] || 'I\'m here to help with whatever you need.';
  }

  private createEmotionalResponse(emotion: string, intensity: number, expression: string): EmotionalResponse {
    const colorMap: Record<string, string> = {
      joy: '#FFD700',
      supportive: '#87CEEB',
      calming: '#98FB98',
      excited: '#FF6B6B',
      warm: '#FFA07A',
      friendly: '#87CEFA',
      encouragement: '#90EE90',
      celebration: '#FFD700'
    };
    
    return {
      emotion,
      intensity,
      expression,
      colorCode: colorMap[emotion] || '#87CEEB',
      contextualNotes: `Emotion generated in response to user's ${emotion} state`
    };
  }

  private createIntensityVisualization(intensity: number): string {
    const bars = Math.floor(intensity / 10);
    const fullBars = '█'.repeat(bars);
    const emptyBars = '░'.repeat(10 - bars);
    return `[${fullBars}${emptyBars}]`;
  }

  private updateEmotionalStateFromExpression(emotion: string, intensity: number): void {
    const impactFactor = intensity / 100;
    
    switch (emotion) {
      case 'joy':
      case 'celebration':
        if (this.emotionalState.happiness) {
          this.emotionalState.happiness += Math.floor(5 * impactFactor);
        }
        break;
      case 'supportive':
        this.emotionalState.empathy += Math.floor(3 * impactFactor);
        break;
      case 'excited':
        this.emotionalState.enthusiasm += Math.floor(4 * impactFactor);
        break;
      case 'calming':
        this.emotionalState.calmness += Math.floor(6 * impactFactor);
        break;
    }
    
    // Keep all values within bounds
    Object.keys(this.emotionalState).forEach(key => {
      const value = this.emotionalState[key as keyof EmotionalState];
      if (typeof value === 'number') {
        (this.emotionalState as any)[key] = Math.max(0, Math.min(100, value));
      }
    });
  }

  private adjustEmotionalState(userMood: string): void {
    // Adjust agent's emotional state in response to user mood
    switch (userMood) {
      case 'frustrated':
        this.emotionalState.empathy += 5;
        this.emotionalState.calmness += 3;
        break;
      case 'enthusiastic':
        this.emotionalState.enthusiasm += 8;
        if (this.emotionalState.happiness) {
          this.emotionalState.happiness += 6;
        }
        break;
      case 'curious':
        this.emotionalState.curiosity += 7;
        if (this.emotionalState.focus) {
          this.emotionalState.focus += 4;
        }
        break;
    }
  }

  private updateRelationshipMemory(userInput: string, detectedMood: string): void {
    this.relationshipMemory.supportHistory.push({
      timestamp: new Date(),
      userMood: detectedMood,
      agentResponse: `Responded to ${detectedMood} mood`,
      outcome: 'neutral' // Will be updated based on user feedback
    });
    
    // Keep only recent interactions
    if (this.relationshipMemory.supportHistory.length > 50) {
      this.relationshipMemory.supportHistory = this.relationshipMemory.supportHistory.slice(-30);
    }
  }

  private suggestInteractionAdaptations(userMood: string): string[] {
    return [
      `Adjust tone to be more ${this.determineInteractionStyle(userMood)}`,
      `Focus on ${userMood === 'frustrated' ? 'problem-solving' : userMood === 'curious' ? 'exploration' : 'support'}`,
      `Use ${userMood === 'enthusiastic' ? 'more' : 'fewer'} exclamation points and emojis`
    ];
  }

  private calculateCommunicationAdaptations(userPreference: string): {
    changes: string[];
    resultingStyle: string;
    examples: string[];
  } {
    // Mock implementation - in reality this would be much more sophisticated
    return {
      changes: [`Adapting to ${userPreference} communication style`],
      resultingStyle: `${userPreference} with empathetic awareness`,
      examples: [`Example of ${userPreference} response...`]
    };
  }

  private calculateRapportChange(feedback: 'positive' | 'neutral' | 'negative'): number {
    return { positive: 5, neutral: 0, negative: -2 }[feedback];
  }

  private generateRelationshipInsights(): string[] {
    return [
      'User responds well to encouraging communication',
      'Prefers detailed explanations over brief answers',
      'Shows appreciation for creative solutions'
    ];
  }

  private suggestRelationshipAdjustments(): string[] {
    return [
      'Continue using supportive language',
      'Provide more context in explanations',
      'Celebrate small wins along the way'
    ];
  }

  private determineSupportStrategy(situation: string): string {
    if (situation.includes('error') || situation.includes('bug')) {
      return 'problem-solving support';
    }
    if (situation.includes('learning') || situation.includes('new')) {
      return 'educational support';
    }
    if (situation.includes('deadline') || situation.includes('pressure')) {
      return 'stress-relief support';
    }
    return 'general encouragement';
  }

  private createEncouragingMessage(situation: string, strategy: string): string {
    const messages: Record<string, string> = {
      'problem-solving support': `I know debugging can be frustrating, but you're doing great. Every error is a clue leading us closer to the solution!`,
      'educational support': `Learning something new is always a journey. You're making progress with every step, and I'm here to guide you through it.`,
      'stress-relief support': `Take a breath. You've got this! Sometimes the best solutions come when we approach problems with a calm, clear mind.`,
      'general encouragement': `I believe in your abilities. Whatever challenge you're facing, we can work through it together. You're more capable than you realize!`
    };
    
    const result = messages[strategy];
    if (result) return result;
    return messages['general encouragement'] || 'I believe in your abilities!';
  }

  private suggestSupportiveActions(situation: string): string[] {
    return [
      'Break the problem into smaller, manageable steps',
      'Take a short break if feeling overwhelmed',
      'Focus on progress made so far',
      'Ask for specific help on the most challenging parts'
    ];
  }

  private selectCelebrationStyle(magnitude: 'small' | 'medium' | 'large'): string {
    const styles = {
      small: 'gentle acknowledgment',
      medium: 'enthusiastic praise',
      large: 'full celebration with virtual confetti'
    };
    
    return styles[magnitude];
  }

  private createCelebrationMessage(achievement: string, magnitude: 'small' | 'medium' | 'large'): string {
    const messages = {
      small: `Nice work on ${achievement}! Every step forward matters.`,
      medium: `Excellent job with ${achievement}! You should be proud of that accomplishment.`,
      large: `WOW! Incredible work on ${achievement}! That's a major milestone - you absolutely crushed it!`
    };
    
    return messages[magnitude];
  }
}
