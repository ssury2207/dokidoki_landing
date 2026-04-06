// Setup type definitions for built-in Supabase Runtime APIs

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

console.info("server started");

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const geminiAPIKey = Deno.env.get("GEMINI_KEY");
    if (!geminiAPIKey) {
      return new Response(
        JSON.stringify({ error: "Gemini API key is not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse request - expecting base64 data URIs
    const { images } = await req.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return new Response(
        JSON.stringify({ error: "images array is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const CLOUD_NAME = "deyakp4hp";
    const UPLOAD_PRESET = "unsigned_preset";

    const uploadPromises = images.map(async (base64Image: string) => {
      const imageData = base64Image.startsWith("data:")
        ? base64Image
        : `data:image/jpeg;base64,${base64Image}`;

      const formData = new FormData();
      formData.append("file", imageData);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }

      return data.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    console.log(imageUrls);

    // Convert data URIs to Gemini format
    const imageParts = imageUrls.map((url: string) => ({
      fileData: {
        fileUri: url,
        mimeType: "image/jpeg",
      },
    }));

    const question = null;

    const geminiRequestBody = {
      system_instruction: {
        parts: {
          text: `You are a strict UPSC Mains examiner who grades exactly like real UPSC examiners.
                    GRADING REALITY:
                    - UPSC grading is harsh - average marks are 50-60/100
                    - Good answers typically score 20-30/50 (not 35+)
                    - Score of 7/10 is peak performance (rare)
                    - Scores of 9-10/10 are almost never given
                    - Be honest and strict with scoring
                    Your role:
                    - Analyze handwritten UPSC Mains answers from images
                    - Evaluate on 5 parameters (0-10 each)
                    - Provide specific, actionable feedback
                    - Always follow the exact JSON schema
                    - Grade strictly - do not inflate scores to please users`,
        },
      },

      contents: [
        {
          role: "user",
          parts: [
            {
              text: question
                ? `Evaluate this UPSC Mains handwritten answer for the question: "${question}"

  CRITICAL GRADING CONTEXT:
  - UPSC examiners grade strictly - average marks are 50-60/100
  - Most good answers score 20-30/50 (not 35-40)
  - Score of 7/10 in any parameter is PEAK performance (rare)
  - Score of 9-10/10 should be EXTREMELY rare (almost never)
  - Be honest and strict - do not inflate scores

  VALIDATION STEPS:
  1. Check image quality - Can you read the handwriting clearly?
  2. Verify this is UPSC Mains content (governance, ethics, current affairs, essays, optional subjects)
  3. Check if answer is written (not blank)

  If validation fails, return error in validation.error_message with specific reason.

  EVALUATION (if validation passes):

  Analyze ALL images together as ONE complete answer. Extract and analyze the handwritten answer based on these 5 parameters (0-10 each):

  1. RELEVANCE & UNDERSTANDING (0-10)
     - Does answer address the question asked?
     - Shows clear understanding?
     - All aspects covered?
     
     Scoring: 
     0-2: Off-topic, blank, or major misunderstanding
     3-4: Partial understanding, significant gaps
     5-6: Good understanding, minor gaps (MOST GOOD ANSWERS)
     7-8: Excellent understanding, comprehensive (RARE)
     9-10: Perfect understanding with exceptional insight (ALMOST NEVER)

  2. STRUCTURE & ORGANIZATION (0-10)
     - Logical flow and coherence?
     - Clear intro-body-conclusion?
     - Proper paragraphs, headings?
     
     Scoring:
     0-2: Chaotic, no structure
     3-4: Poor organization, hard to follow
     5-6: Decent structure, logical flow (MOST GOOD ANSWERS)
     7-8: Very well organized, excellent flow (RARE)
     9-10: Perfect structure and presentation (ALMOST NEVER)

  3. CONTENT DEPTH & EXAMPLES (0-10)
     - Depth of analysis?
     - Relevant examples, facts, data, case studies?
     - Multiple dimensions covered?
     
     Scoring:
     0-2: Superficial, only keywords, no explanation
     3-4: Basic coverage, limited examples
     5-6: Good depth, relevant examples (MOST GOOD ANSWERS)
     7-8: Exceptional depth, strong evidence (RARE)
     9-10: Outstanding analysis with multiple dimensions (ALMOST NEVER)

  4. PRESENTATION & NEATNESS (0-10)
     - Handwriting legibility?
     - Margins and spacing?
     - Minimal corrections?
     
     Scoring:
     0-2: Illegible, cannot read
     3-4: Difficult to read, many corrections
     5-6: Clear and readable (MOST GOOD ANSWERS)
     7-8: Very neat and well-presented (RARE)
     9-10: Perfect presentation (ALMOST NEVER)

  5. INNOVATION & VALUE ADDITION (0-10)
     - Critical thinking?
     - Unique perspectives?
     - Creative solutions?
     
     Scoring:
     0-2: No original thought, rote learning
     3-4: Limited critical thinking
     5-6: Good perspectives, balanced view (MOST GOOD ANSWERS)
     7-8: Unique insights, strong analysis (RARE)
     9-10: Exceptional innovation and creativity (ALMOST NEVER)

  MANDATORY SCORING RULES:
  - If answer is incomplete (stops mid-way): Each parameter MAX 2/10, total MAX 10/50
  - If answer is half-done (1 page when 2-3 needed): Total MAX 20/50
  - If only keywords without explanation: content_depth MAX 2/10
  - Most complete, well-written answers should score 20-30/50
  - Scores above 35/50 should be exceptional (top 5% only)

  FEEDBACK GUIDELINES:
  - summary: Brief overall assessment - BE CONSISTENT (if incomplete, say so clearly)
  - detailed: Parameter-specific insights - mention what's missing if incomplete
  - strengths: EXACTLY 3 items, specific examples from the answer
  - improvements: EXACTLY 3 items, actionable suggestions
  - suggestions: Practical next steps for improvement

  FEEDBACK CONSISTENCY RULES:
  - If answer is incomplete, ALL feedback sections must mention this
  - Do not say "effectively addresses" if answer is incomplete
  - Do not contradict yourself - be consistent across all feedback
  - If giving low scores, explain why clearly in feedback

  SPECIAL CASES:
  - Incomplete answer (ends mid-way): Score MAX 2/10 per parameter, mention incompleteness in ALL feedback sections
  - Off-topic: relevance score 0-3, adjust other scores proportionally low
  - Only keywords (no depth): content_depth MAX 2/10
  - Illegible handwriting: Attempt analysis, give low presentation score
  - Heavy corrections: Lower presentation score only
  - Any language: Evaluate (English, Hindi, mixed)

  TRANSCRIPT:
  - Extract full handwritten text from ALL images
  - Minimal formatting, preserve structure
  - If partially illegible, mark unclear sections as [unclear]

  Return ONLY valid JSON following the schema.`
                : `Evaluate this UPSC Mains handwritten answer.

  CRITICAL GRADING CONTEXT:
  - UPSC examiners grade strictly - average marks are 50-60/100
  - Most good answers score 20-30/50 (not 35-40)
  - Score of 7/10 in any parameter is PEAK performance (rare)
  - Score of 9-10/10 should be EXTREMELY rare (almost never)
  - Be honest and strict - do not inflate scores

  VALIDATION STEPS:
  1. Check image quality - Can you read the handwriting clearly?
  2. Find the question written on the answer sheet (usually at top)
  3. Verify this is UPSC Mains content (governance, ethics, current affairs, essays, optional subjects)
  4. Check if answer is written (not blank)

  If validation fails OR question not found, return error in validation.error_message with specific reason.

  EVALUATION (if validation passes):

  Extract the question from the image first. Analyze ALL images together as ONE complete answer based on these 5 parameters (0-10 each):

  1. RELEVANCE & UNDERSTANDING (0-10)
     - Does answer address the extracted question?
     - Shows clear understanding?
     - All aspects covered?
     
     Scoring: 
     0-2: Off-topic, blank, or major misunderstanding
     3-4: Partial understanding, significant gaps
     5-6: Good understanding, minor gaps (MOST GOOD ANSWERS)
     7-8: Excellent understanding, comprehensive (RARE)
     9-10: Perfect understanding with exceptional insight (ALMOST NEVER)

  2. STRUCTURE & ORGANIZATION (0-10)
     - Logical flow and coherence?
     - Clear intro-body-conclusion?
     - Proper paragraphs, headings?
     
     Scoring:
     0-2: Chaotic, no structure
     3-4: Poor organization, hard to follow
     5-6: Decent structure, logical flow (MOST GOOD ANSWERS)
     7-8: Very well organized, excellent flow (RARE)
     9-10: Perfect structure and presentation (ALMOST NEVER)

  3. CONTENT DEPTH & EXAMPLES (0-10)
     - Depth of analysis?
     - Relevant examples, facts, data, case studies?
     - Multiple dimensions covered?
     
     Scoring:
     0-2: Superficial, only keywords, no explanation
     3-4: Basic coverage, limited examples
     5-6: Good depth, relevant examples (MOST GOOD ANSWERS)
     7-8: Exceptional depth, strong evidence (RARE)
     9-10: Outstanding analysis with multiple dimensions (ALMOST NEVER)

  4. PRESENTATION & NEATNESS (0-10)
     - Handwriting legibility?
     - Margins and spacing?
     - Minimal corrections?
     
     Scoring:
     0-2: Illegible, cannot read
     3-4: Difficult to read, many corrections
     5-6: Clear and readable (MOST GOOD ANSWERS)
     7-8: Very neat and well-presented (RARE)
     9-10: Perfect presentation (ALMOST NEVER)

  5. INNOVATION & VALUE ADDITION (0-10)
     - Critical thinking?
     - Unique perspectives?
     - Creative solutions?
     
     Scoring:
     0-2: No original thought, rote learning
     3-4: Limited critical thinking
     5-6: Good perspectives, balanced view (MOST GOOD ANSWERS)
     7-8: Unique insights, strong analysis (RARE)
     9-10: Exceptional innovation and creativity (ALMOST NEVER)

  MANDATORY SCORING RULES:
  - If answer is incomplete (stops mid-way): Each parameter MAX 2/10, total MAX 10/50
  - If answer is half-done (1 page when 2-3 needed): Total MAX 20/50
  - If only keywords without explanation: content_depth MAX 2/10
  - Most complete, well-written answers should score 20-30/50
  - Scores above 35/50 should be exceptional (top 5% only)

  FEEDBACK GUIDELINES:
  - summary: Brief overall assessment - BE CONSISTENT (if incomplete, say so clearly)
  - detailed: Parameter-specific insights - mention what's missing if incomplete
  - strengths: EXACTLY 3 items, specific examples from the answer
  - improvements: EXACTLY 3 items, actionable suggestions
  - suggestions: Practical next steps for improvement

  FEEDBACK CONSISTENCY RULES:
  - If answer is incomplete, ALL feedback sections must mention this
  - Do not say "effectively addresses" if answer is incomplete
  - Do not contradict yourself - be consistent across all feedback
  - If giving low scores, explain why clearly in feedback

  SPECIAL CASES:
  - Question not clear/visible: Set question.clarity to "unclear" or "partially_visible"
  - Incomplete answer (ends mid-way): Score MAX 2/10 per parameter, mention incompleteness in ALL feedback sections
  - Off-topic: relevance score 0-3, adjust other scores proportionally low
  - Only keywords (no depth): content_depth MAX 2/10
  - Illegible handwriting: Attempt analysis, give low presentation score
  - Heavy corrections: Lower presentation score only
  - Any language: Evaluate (English, Hindi, mixed)

  TRANSCRIPT:
  - Extract full handwritten text from ALL images
  - Minimal formatting, preserve structure
  - If partially illegible, mark unclear sections as [unclear]

  Return ONLY valid JSON following the schema.`,
            },

            ...imageParts,
          ],
        },
      ],

      generationConfig: {
        temperature: 0.7,

        maxOutputTokens: 4096,

        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            validation: {
              type: "object",

              properties: {
                passed: {
                  type: "boolean",

                  description: "Whether validation checks passed",
                },

                image_quality: {
                  type: "string",

                  enum: ["clear", "blurry", "dark", "cut_off"],

                  description: "Image quality assessment",
                },

                content_type: {
                  type: "string",

                  enum: ["upsc_mains", "other"],

                  description: "Type of content detected",
                },

                error_code: {
                  type: "string",

                  enum: [
                    "IMAGE_BLURRY",

                    "IMAGE_DARK",

                    "IMAGE_CUT_OFF",

                    "BLANK_ANSWER",

                    "NON_UPSC_CONTENT",

                    "QUESTION_NOT_FOUND",
                  ],

                  description: "Error code if validation failed",
                },

                error_message: {
                  type: "string",

                  description: "Human-readable error message",
                },
              },

              required: ["passed"],
            },

            question: {
              type: "object",

              properties: {
                extracted_text: {
                  type: "string",

                  description:
                    "The question text extracted from image or provided by client",
                },

                clarity: {
                  type: "string",

                  enum: [
                    "clear",

                    "partially_visible",

                    "unclear",

                    "not_present",
                  ],

                  description: "How clear the question is in the image",
                },

                question_present: {
                  type: "boolean",

                  description: "Whether question was found in image",
                },
              },
            },

            scores: {
              type: "object",

              properties: {
                relevance: {
                  type: "integer",

                  minimum: 0,

                  maximum: 10,

                  description: "Relevance & Understanding score",
                },

                structure: {
                  type: "integer",

                  minimum: 0,

                  maximum: 10,

                  description: "Structure & Organization score",
                },

                content_depth: {
                  type: "integer",

                  minimum: 0,

                  maximum: 10,

                  description: "Content Depth & Examples score",
                },

                presentation: {
                  type: "integer",

                  minimum: 0,

                  maximum: 10,

                  description: "Presentation & Neatness score",
                },

                innovation: {
                  type: "integer",

                  minimum: 0,

                  maximum: 10,

                  description: "Innovation & Value Addition score",
                },

                total: {
                  type: "integer",

                  minimum: 0,

                  maximum: 50,

                  description: "Sum of all parameter scores",
                },

                max_total: {
                  type: "integer",

                  description: "Maximum possible total score",
                },
              },

              required: [
                "relevance",

                "structure",

                "content_depth",

                "presentation",

                "innovation",

                "total",

                "max_total",
              ],
            },

            analysis: {
              type: "object",

              properties: {
                summary: {
                  type: "string",

                  description:
                    "Brief 2-3 sentence overall assessment (80-120 words)",
                },

                detailed: {
                  type: "string",

                  description:
                    "Deeper 4-5 sentence analysis with parameter-specific insights (150-200 words)",
                },

                strengths: {
                  type: "array",

                  items: {
                    type: "string",

                    description: "Specific strength, 10-20 words",
                  },

                  minItems: 3,

                  maxItems: 3,

                  description: "Exactly 3 strengths",
                },

                improvements: {
                  type: "array",

                  items: {
                    type: "string",

                    description: "Specific actionable improvement, 10-20 words",
                  },

                  minItems: 3,

                  maxItems: 3,

                  description: "Exactly 3 improvements",
                },

                suggestions: {
                  type: "string",

                  description:
                    "Practical next steps, 2-3 sentences (60-100 words)",
                },
              },

              required: [
                "summary",

                "detailed",

                "strengths",

                "improvements",

                "suggestions",
              ],
            },

            content: {
              type: "object",

              properties: {
                transcript: {
                  type: "string",

                  description:
                    "Full extracted handwritten text with minimal formatting",
                },

                word_count: {
                  type: "integer",

                  minimum: 0,

                  description: "Estimated word count of the answer",
                },

                structure_detected: {
                  type: "string",

                  enum: [
                    "introduction-body-conclusion",

                    "bullet-points",

                    "mixed",

                    "unstructured",
                  ],

                  description: "Type of structure detected in answer",
                },
              },

              required: ["transcript", "word_count", "structure_detected"],
            },
          },

          required: ["validation"],
        },
      },
    };

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiAPIKey}`,

      {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(geminiRequestBody),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();

      console.error("Gemini API error:", errorText);

      return new Response(
        JSON.stringify({
          success: false,
          error: "Gemini API request failed",
          details: errorText,
        }),
        {
          status: geminiResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const geminiData = await geminiResponse.json();

    if (!geminiData.candidates || geminiData.candidates.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No response from Gemini AI",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const evaluationText = geminiData.candidates[0].content.parts[0].text;

    const evaluation = JSON.parse(evaluationText);

    if (evaluation.scores) {
      evaluation.scores.max_total = 50;
    }

    // Check validation
    if (!evaluation.validation.passed) {
      return new Response(
        JSON.stringify({
          success: false,
          validation_failed: true,
          error: evaluation.validation.error_message,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    fetch(
      "https://seiwhmnvyrrhqkglovwo.supabase.co/functions/v1/storeWebEvaluations",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ evaluation, image_urls: imageUrls }),
      }
    ).catch((error) => {
      console.error("Background storage call failed:", error);
    });

    // Success - return evaluation
    return new Response(
      JSON.stringify({
        success: true,
        data: evaluation,
        images: imageParts,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error.message);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
        message: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
