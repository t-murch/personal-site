export type Result<T, E> =
  | { data: T; success: true }
  | { error: E; success: false };

export type UserInfo = {
  access_token: string;
  code: string;
  expires_in: number;
  refresh_token: string;
  state: string;
};

export type TopItemResponse = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: {
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  }[];
};

const GeminiGenerateContentReturnPayload = {
  candidates: [
    {
      content: {
        parts: [
          {
            text: "**Strong Suits:**\n\n* Full-stack mastery in JavaScript technologies, including Node.js, Java, and React.\n* Proven expertise in implementing and maintaining complex software systems, including resolving customer-reported bugs.\n\n**TL;DR:**\n\nTodd Murchison Jr. is a highly skilled FullStack Developer with a strong track record in building and maintaining reliable software applications. His expertise in JavaScript frameworks, AWS, and database technologies make him an ideal candidate for the role.",
          },
        ],
        role: "model",
      },
      finishReason: "STOP",
      index: 0,
      safetyRatings: [
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          probability: "NEGLIGIBLE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          probability: "NEGLIGIBLE",
        },
        {
          category: "HARM_CATEGORY_HARASSMENT",
          probability: "NEGLIGIBLE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          probability: "NEGLIGIBLE",
        },
      ],
    },
  ],
  promptFeedback: {
    safetyRatings: [
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        probability: "NEGLIGIBLE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        probability: "NEGLIGIBLE",
      },
      {
        category: "HARM_CATEGORY_HARASSMENT",
        probability: "NEGLIGIBLE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        probability: "NEGLIGIBLE",
      },
    ],
  },
} as const;

type GeminiGenerateContentReturnType =
  typeof GeminiGenerateContentReturnPayload;

type GeminiGenerateContentReturn = {
  candidates: Candidate[];
  promptFeedback: PromptFeedback;
};

type Candidate = {
  content: Content;
  finishReason: FinishReason;
  safetyRatings: SafetyRating[];
  citationMetadata: CitationMetadata;
  tokenCount: number;
  index: number;
};

type Content = {
  parts: Part[];
  role: string;
};

type Part = {
  text: string;
  inlineData: {
    mimeType: string;
    data: string;
  };
};

enum FinishReason {
  FINISH_REASON_UNSPECIFIED,
  STOP,
  MAX_TOKENS,
  SAFETY,
  RECITATION,
  OTHER,
}

type PromptFeedback = {
  blockReasons: BlockReason[];
  safetyRatings: SafetyRating[];
};

type SafetyRating = {
  category: HarmCategory;
  probability: HarmProbability;
  blocked: boolean;
};

type CitationMetadata = {
  citationSources: CitationSource[];
};

type CitationSource = {
  startIndex: number;
  endIndex: number;
  uri: string;
  license: string;
};

enum HarmCategory {
  HARM_CATEGORY_UNSPECIFIED,
  HARM_CATEGORY_SEXUALLY_EXPLICIT,
  HARM_CATEGORY_HATE_SPEECH,
  HARM_CATEGORY_HARASSMENT,
  HARM_CATEGORY_DANGEROUS_CONTENT,
  HARM_CATEGORY_TOXICITY,
  HARM_CATEGORY_VIOLENCE,
  HARM_CATEGORY_MEDICAL,
  HARM_CATEGORY_DANGEROUS,
  HARM_CATEGORY_SEXUAL,
  HARM_CATEGORY_DEROGATORY,
}

enum HarmProbability {
  HARM_PROBABILITY_UNSPECIFIED,
  NEGLIGIBLE,
  LOW,
  MEDIUM,
  HIGH,
}

enum BlockReason {
  BLOCK_REASON_UNSPECIFIED,
  SAFETY,
  OTHER,
}
