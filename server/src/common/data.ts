import { Question, ReadingQuestion } from "./types";

export const data: (Question | ReadingQuestion)[] = [
    {
      "id": 0,
      "question": "The population of City X increased from 2 million in the year 2000 to 2.5 million in 2015 and the gross domestic product of the city in 2000 was 38% less than that in 2015. What was the approximate percent change, rounded to the nearest integer if required, in the per capita gross domestic product of the city from 2000 to 2015?",
      "answers": [
        "22% decrease",
        "22% increase",
        "28% increase",
        "53% increase",
        "113% increase"
      ],
      "type": "Quantitative Reasoning - Problem Solving",
      "correct": 2,
      "explanation": "Your choosing this option indicates that you probably made one of these two mistakes:\n\nPossible Mistake 1:\n\nYou didn't read the question statement carefully, and so, wrongly thought that:\n(GDP in 2015)=58(GDP in 2000)\nThe given information was in fact the other-way round:\n(GDP in 2000)=58(GDP in 2015)\nThe lesson you can learn from this mistake is to study the given information carefully before starting to solve the question.\n\nPossible Mistake 2:\n\nYou rightly understood that\n(GDP in 2000)=58(GDP in 2015)\nBut you wrongly interpreted 'per capita GDP' to mean (Population × GDP). The correct expression for this phrase is (GDP / Population).\n\nHere is the correct solution for this question:\n\nLet's label the Population and the Gross Domestic Product (GDP) for the years 2000 and 2015 as follows:\n\nQuantity\tYear 2000\tYear 2015\nPopulation\tP0\tP1\nGDP (Gross Domestic Product)\tG0\tG1\nSo, Per Capita GDP\tG0/P0\tG1/P1\nWe are given that:\n\nP0=2×10^6\nP1=2.5×10^6\nG0=G1−38G1=(58)×G1\nTo find: % Change in Per Capita GDP over 2000-2015\n\n=(Per Capita GDP in 2015)−(Per Capita GDP in 2000)/(Per Capita GDP in 2000)×100%\n=G1/P1−G0/P0/G0/P0×100\n=⎛⎝G1/P1/G0/P0−1⎞⎠×100\n=(G1×P0/G0×P1−1)×100\n=(G1×(2×10^6)/(58×G1)×(2.5×10^6)−1)×100\n=(1×2/(58)×2.5−1)×100\n=(8×2.5/25−1)×100\n=(8×0.1−1)×100\n=(0.8−1)×100\n=(0.2)×100\n=28%\nSince the percent-change between 2015 and 2000 is positive, this means that the per capita GDP in 2015 was greater than that in 2000.\n\nHence, the correct answer is: 28% Increase\n\nAlternate approach:\n\nWe know that 'the gross domestic product of the city in 2000 was 38% less than that in 2015,' so let's assume that the GDP in 2015 was 800; thus, the GDP in the year 2000=800−38%×800=500.\n\nWe assumed a seemingly puzzling number '800' for the GDP in 2015 since we find that in the denominator of the fraction 38%, we have to deal with '8,' and '800' is a multiple of '8' — easy to deal with.\n\nWe know that the population year 2000 =2M and that in 2015 =2.5M.\nThus,\n\nPer capita GDP in 2000=GDP/population=500/2M=250M\nand\n\nPer capita GDP in 2005=GDP/population=800/2.5M=8000/2.5M=320M\nThus,\n\nChange in Per Capita GDP over 2000-2015=(Per Capita GDP in 2015)−(Per Capita GDP in 2000)/(Per Capita GDP in 2000)×100%\n=320M−250M/250M×100%\n=70/250×100%\n=28%",
      "difficulty": "Challenging"
    },
    {
      "id": 1,
      "question": "A box contains 20 balls, of which 12 are red and 8 are blue. If two balls are to be drawn from this box at random without replacement, what is the probability that one ball will be red and the other will be blue?",
      "answers": [
        "1/96",
        "6/25",
        "24/95",
        "48/95",
        "1"
      ],
      "type": "Quantitative Reasoning - Problem Solving",
      "correct": 3,
      "explanation": "It seems that you have solved the problem in the following way:\n\nProbability that one ball will be red and the other will be blue\n\n=(Probability of drawing the only red ball out of 12 balls)×(Probability of drawing the only blue ball out of 8 balls)\n=(1/12)×(1/8)=1/96\nThis is incorrect. Your mistake was that you misinterpreted the narration to be:\n\n\"There are two sections in a box: The first section has 12 balls, out of which only one is red; the second section has 8 balls, out of which only one is blue. If one ball from each section is to be drawn, what is the probability that the ball from the first section will be red and the ball from the second section will be blue?\"\n\nLet's see the correct solution:\n\nThere are total 20 balls, out of which 12 are red and 8 are blue.\n\nProbability that one ball will be red and the other will be blue\n\n=(Number of ways of drawing one red ball)×(Number of ways of drawing one blue ball)/(Number of ways of drawing two balls of any color)\n⇒C(12,1)×C(8,1)/C(20,2)=12×8/190=48/95\nFor the number of ways of drawing two balls out of 20, the image in your mind should be of dropping your hand in a box of 20 balls, closing your fist as soon as you get 2 balls in your hand, bringing your hand out of the box and then opening your fist to see which 2 balls you got. This image clarifies that, in the denominator of the probability calculation, we are considering the number of ways in which a group of two balls can be made from 20 total balls.\n\nAlternate approach:\n\nIn the first approach, we took the Combination approach. Let's now see how one could take the Permutation approach to solve this question.\n\nIf you have to draw two balls in two drawings, there are only two ways in which you end up with one red ball and one blue ball:\n\nEither, you get a red ball in the first drawing and a blue ball in the second drawing.\nOr, you get a blue ball in the first drawing and a red ball in the second drawing.\nThe question doesn't specify any particular order in which balls should be drawn. So, we will consider both these ways.\n\nSay,\n\nthe probability of getting a red ball in the first drawing out of 20 balls=P(R1);\nthe probability of getting a blue ball in the second drawing out of (20−1)=19 balls=P(B2);\nthe probability of getting a blue ball in the first drawing out of 20 balls=P(B1);\nthe probability of getting a red ball in the second drawing out of (20−1)=19 balls=P(R2);\nSo, Probability that one ball will be red and the other will be blue\n\n=[P(R1)×P(B2)]+[P(B1)×P(R2)]\n=2×[P(R1)×P(B2)]\n=2×(12/20)×(8/19)=48/95\nFor the second drawing, we deducted the total number of balls from 20 to get the total number of balls equal to 19 since one red ball was already drawn in the first drawing, leaving one ball less. (Had the balls been drawn with replacement, then the total number of balls available for the second drawing would have remained 20)",
      "difficulty": "Challenging"
    },
    {
      "id": 2,
      "question": "Given that:\n\n4m+n=20;\n\nand\n\n|n|≤20\n\nHow many ordered pairs (m,n) exist in which m and n both are integers?",
      "answers": [
        "Five",
        "Six",
        "Ten",
        "Eleven",
        "Forty-one"
      ],
      "type": "Quantitative Reasoning - Problem Solving",
      "correct": 3,
      "explanation": "While considering |n|≤20, you correctly counted all the 41 possible integer values of n. However, you failed to correlate these with the equation: 4m+n=20.\n\nRemember that of all the 41 integer values of n you identified through the above inequality, you had to reject those values for which the value of m obtained from the given equation was not an integer.\n\nLet's see the correct solution:\n\nAs per the given inequality: |n|≤20, the value of 'n' ranges from '-20' to '+20', inclusive.\n\nNow, by putting integer values of m in the equation: 4m+n=20, we can find the corresponding values of n and then reject those values of m for which n lies outside the above range.\n\nFor example, if m=0, then from the equation, you get n=20. This value of n lies within the range '-20' to '+20', inclusive. So, m can be 0. However, if you put m=20, then you get n=−60 and this value lies outside the defined range for n. So, m cannot be 20.\n\nThis way, by trying different values of m, we can form a table of values of m & n that satisfy both the given equation and the given inequality.\n\nm\t n\n0\t 20\n1\t 16\n2\t 12\n3\t 8\n4\t 4\n5\t 0\n6\t −4\n7\t −8\n8\t −12\n9\t −16\n10\t −20\nSo total 11 ordered (m,n) pairs are possible.\n\nAlternate approach:\n\nWe see that the value of n ranges from '-20' to '+20' inclusive. Also, within this range, we need to consider only the integer values of n, that is:\n\n(-20, -19, -18, ... 0, 1, 2, ... 18, 19, 20)\n\nWe see that there are 41 such values.\n\nNow let us see how many integer values m can have.\n\n4m+n=20⇒m=(20−n)/4;\n\n⇒m=(20−n)/4\nWe see that for m to be an integer, n/4 must be an integer; this follows that n must be a multiple of '4' or '0'.\n\nOut of the 41 possible values of n above, only 11 values are multiple of '4' and one value is '0'. So, there are only 11 values of n that allow m to be an integer. Therefore, there are only 11 ordered (m,n) pairs possible.",
      "difficulty": "Challenging"
    },
    {
      "id": 3,
      "question": "In a certain class, a teacher distributed a few candies and a few bars among the students such that each student got an equal number of candies and an equal number of bars and no candies or bars remained undistributed. How many students were there in the class?\n\n(1) The teacher distributed 180 candies and 40 bars.\n(2) The total number of items received by each student was less than 20.",
      "answers": [
        "Statement (1) ALONE is sufficient, but statement (2) ALONE is not sufficient to answer the question asked.",
        "Statement (2) ALONE is sufficient, but statement (1) ALONE is not sufficient to answer the question asked.",
        "BOTH statements (1) and (2) TOGETHER are sufficient to answer the question asked, but NEITHER statement ALONE is sufficient to answer the question asked.",
        "EACH statement ALONE is sufficient to answer the question asked.",
        "Statements (1) and (2) TOGETHER are NOT sufficient to answer the question asked, and additional data specific to the problem are needed."
      ],
      "type": "Quantitative Reasoning - Data Sufficiency",
      "correct": 2,
      "explanation": "Statement 1: We know that each student received an equal number of candies and an equal number of bars. Thus, the greatest common divisor (GCD) of the number of candies and the number of bars is the largest possible number of students in the class.\n\nFor 180 candies and 40 bars:\n180 = 2^2 × 3^2 × 5\n40 = 2^3 × 5\nGCD = 2^2 × 5 = 20\n\nThus, the number of students could be 20 or a factor of 20 (1, 2, 4, 5, 10, 20). If we test these, we find:\n- 20 students: each receives 9 candies and 2 bars\n- 10 students: each receives 18 candies and 4 bars\n- 5 students: each receives 36 candies and 8 bars\n\nSince no information specifies that the total number of items per student must be less than 20, Statement 1 alone is insufficient.\n\nStatement 2: This statement alone does not provide information about the number of candies or bars, so it is insufficient on its own.\n\nCombining both statements: The total number of items per student must be less than 20. From Statement 1, the number of students can be 20, 10, 5, 4, or 2. Testing these possibilities, only the case where there are 20 students results in fewer than 20 items per student. Hence, the number of students is 20.\n\nTherefore, both statements together are sufficient.",
      "difficulty": "Challenging"
    },
    {
      "id": 4,
      "question": "If no bulk purchase discount applies, what is the price of 13 oranges and 12 apples?\n\n(1) The price of 39 oranges and 36 apples is $111.\n(2) The price of 3 oranges and 2 apples is $7.",
      "answers": [
        "Statement (1) ALONE is sufficient, but statement (2) ALONE is not sufficient to answer the question asked.",
        "Statement (2) ALONE is sufficient, but statement (1) ALONE is not sufficient to answer the question asked.",
        "BOTH statements (1) and (2) TOGETHER are sufficient to answer the question asked, but NEITHER statement ALONE is sufficient to answer the question asked.",
        "EACH statement ALONE is sufficient to answer the question asked.",
        "Statements (1) and (2) TOGETHER are NOT sufficient to answer the question asked, and additional data specific to the problem are needed."
      ],
      "type": "Quantitative Reasoning - Data Sufficiency",
      "correct": 0,
      "explanation": "Statement 1: We are given that the combined price of 39 oranges and 36 apples is $111. Since 39 is 3 times 13 and 36 is 3 times 12, the combined price of 13 oranges and 12 apples is $111 ÷ 3 = $37.\n\nStatement 2: The price of 3 oranges and 2 apples is $7. This information alone does not help in calculating the price for 13 oranges and 12 apples directly.\n\nTherefore, Statement 1 alone is sufficient to determine the price of 13 oranges and 12 apples. Statement 2 alone is insufficient.",
      "difficulty": "Challenging"
    },
    {
      "id": 5,
      "question": "What is the price of an orange?\n\n(1) The price of 3 oranges and 2 apples is $7.\n(2) The price of an orange and the price of an apple are both integers.",
      "answers": [
        "Statement (1) ALONE is sufficient, but statement (2) ALONE is not sufficient to answer the question asked.",
        "Statement (2) ALONE is sufficient, but statement (1) ALONE is not sufficient to answer the question asked.",
        "BOTH statements (1) and (2) TOGETHER are sufficient to answer the question asked, but NEITHER statement ALONE is sufficient to answer the question asked.",
        "EACH statement ALONE is sufficient to answer the question asked.",
        "Statements (1) and (2) TOGETHER are NOT sufficient to answer the question asked, and additional data specific to the problem are needed."
      ],
      "type": "Quantitative Reasoning - Data Sufficiency",
      "correct": 2,
      "explanation": "Statement 1: The equation 3x + 2y = 7 where x is the price of an orange and y is the price of an apple does not have a unique solution. If we assume y = 1, then x = 5/3. If y = 2, then x = 1. We cannot determine a unique price for an orange from this alone.\n\nStatement 2: Knowing that the prices are integers does not provide enough information to find the unique price of an orange by itself.\n\nCombining both statements: From Statement 1, 3x + 2y = 7. By testing integer values of y from Statement 2, we find that y = 2 gives a unique solution x = 1. This is the only solution within non-negative integer values.\n\nThus, both statements together are sufficient to determine the price of an orange uniquely.",
      "difficulty": "Challenging"
    },
    {
      "id": 6,
      "question": "Amid the present wave of job redundancies for skilled but unemployed youth, the publication of an encouraging report on the viability of garage startup enterprises has led the Federal government to set up an investment fund, under its Federal light-industry program, to provide capital for such enterprises. This plan has drawn opposition from various quarters; the critics claim that similar funds, also set up under the Federal light-industry program, that aim to stimulate small enterprises frequently end up harming other American social groups unconnected to these enterprises.\n\nWhich of the following best provides support for the claim made by the critics above?",
      "answers": [
        "Garage enterprises in Washington State now produce almost 12% of the vehicle components previously imported from South East Asia.",
        "The funding of the Federal light-industry program depends on the reallocation of resources earmarked for disadvantaged groups.",
        "The debate concerning the Federal light-industry program created a backlog in the Federal legislative schedule.",
        "The union for Federal light-Industry workers was the prime source of the claim.",
        "Programs like Federal light-industry programs have yielded great results in past."
      ],
      "type": "Verbal Reasoning - Critical Reasoning",
      "correct": 1,
      "explanation": "The argument asserts that funds set up under the Federal light-industry program may negatively impact other social groups. To support this claim, we need evidence showing that funding these programs comes at the expense of other groups. Statement (B) supports the critics' claim because it highlights that the funding of the Federal light-industry program relies on reallocating resources from disadvantaged groups, thereby harming those groups. This aligns with the critics' concerns about negative effects on unconnected social groups.",
      "difficulty": "Challenging"
    },
    {
      "id": 7,
      "question": "Recently developed tourism infrastructure, including ten-story hotels and neon-lit discos, is obscuring the moonlight, disorienting the female turtles as they seek out beaches to lay their eggs. Often the confusion leads them to assume that the hotel pools are the sea and they end up laying their eggs in the pool flowerbeds. Once the eggs hatch, the hatchlings are unable to find their way to the sea and die. The stringent building regulations that protected the turtles in the past are being flouted openly by organized criminals who either bribe or terrorize officials into turning a blind eye.\n\nWhich of the following can be inferred from the above passage?",
      "answers": [
        "Scarcity of turtles results in ecological imbalance of sea.",
        "Chemicals in pool water are not safe for turtles.",
        "Moonlight is the only source of light for turtles.",
        "Turtles are guided by moonlight.",
        "Organized gangs are ignoring building restrictions."
      ],
      "type": "Verbal Reasoning - Critical Reasoning",
      "correct": 3,
      "explanation": "The passage implies that moonlight is crucial for the turtles' navigation. The turtles are disoriented by the obscured moonlight and mistakenly lay their eggs in unsuitable locations. This indicates that moonlight serves as a guide for the turtles, helping them find their way to the sea. Therefore, we can infer that turtles are guided by moonlight.",
      "difficulty": "Challenging"
    },
    {
      "id": 8,
      "question": "(1) The move to shift the fiscal obligation to provide community services away from the Federal government to the local communities is welcomed by its proponents as a step forward on the road to true democracy. They claim that by making communities responsible for funding everything from health, welfare and education to the emergency services and housing, not only will these services improve but it will also foster a greater sense of community. (2) However, such a move would mean that densely-populated areas, having a greater tax base, would be better off, and sparsely-populated, rural communities would still be dependent on supplemental subsidies from Federal sources.",
      "answers": [
        "The first is a claim that the author calls in question, and the second is a claim that goes against the first.",
        "The first is a claim that the author endorses, and the second is a claim that the author calls in question.",
        "The first is a counter-evidence to the second, and the second is the proponents' prediction.",
        "The first is the author's claim, and the second is the proponents’ finding that puts the first questionable.",
        "The first is a prediction that the author elaborates further, and the second is the objection that the argument nullifies."
      ],
      "type": "Verbal Reasoning - Critical Reasoning",
      "correct": 0,
      "explanation": "The first boldfaced portion presents the proponents' claim that shifting fiscal responsibility to local communities will improve services and foster a sense of community. The second boldfaced portion presents a counterclaim by the author, arguing that such a shift would benefit densely-populated areas while leaving sparsely-populated areas still dependent on federal subsidies. Thus, the first boldfaced portion is the claim made by the proponents, and the second is a claim made by the author that goes against it.",
      "difficulty": "Challenging"
    },
    {
      "id": 9,
      "type": "Verbal Reasoning - Reading Comprehension",
      "text": "To believe a proposition, say corn flakes have health benefits, is to accept it to be true. However, the question of belief is valid only for those propositions that are understandable. An understandable proposition is one that is expressed using correct grammar and known words.\n\nThe dominant view in the scientific community on how human mind believes or disbelieves an understandable proposition is the Cartesian hypothesis, propounded by the seventeenth-century philosopher René Descartes. He said that when an understandable proposition is presented to a human mind, the comprehension of its content happens automatically and passively; however, the assessment of the truth-value of that proposition is a later and deliberate act, the result of which is either belief or disbelief. Thus, this view holds that belief or disbelief in a comprehended proposition is created by rational assessment, and till such an assessment is made, the intellect neither affirms nor denies a comprehended proposition. It also suggests that the mental effort required to create belief and disbelief is the same: the effort required to assess the comprehended proposition.\n\nIn contrast, Descartes's near-contemporary Baruch Spinoza suggested that comprehension of and belief in an understandable proposition happen together, automatically and passively; he said that it is not possible to understand a proposition without, at least temporarily, accepting it to be true. On later, willful assessment, if one judges the believed proposition to be false, it may be unaccepted (disbelieved), and if judged to be true, one may continue to believe in it. Thus, as per the Spinozan hypothesis, the default setting of the human mind is to believe every understandable proposition that is presented to it; disbelief is possible but it comes – if it comes at all – from effortful, deliberate assessment done after the initial comprehension-belief.\n\nBoth hypotheses continue to have their proponents and opponents. It is, however, a common observation that doubt, suspension of judgment and disbelief are mentally taxing tasks while we naturally – effortlessly – accept and believe most of what we see, hear and read. Research has proved that we systematically err on the side of believing too much, as opposed to rejecting too much. This inherent credulity of the human mind is, in fact, the founding axiom of the fields of advertising and propaganda.\n\nAdapted from a research paper by Professor Daniel Gilbert",
      "questions": [
        {
          "id": 9,
          "question": "A supporter of the Cartesian hypothesis would probably agree with which of the following statements?",
          "answers": [
              "Understanding a proposition is one thing and believing another",
              "Believing is the most effortful thing that a human mind does",
              "Belief is more quickly and easily acquired than doubt",
              "Human beings are more prone to rejecting than believing propositions",
              "Human beings are skeptical and credulous in equal measure"
          ],
          "type": "Verbal Reasoning - Reading Comprehension",
          "correct": 0,
          "explanation": "Let us analyze the options one by one.\n\nA. This option is correct. It is indeed the central tenet of the Cartesian hypothesis that Understanding is a unique process from Belief (or disbelief).\nB. This option is incorrect. While the Cartesian hypothesis does suggest that believing is an effortful thing, it will be wrong to infer that believing is the most effortful thing that a human mind does. The passage does not compare the effort required by the human mind for believing with the effort it requires for other activities.\nC. This option is incorrect. This statement is in accordance with the Spinozan hypothesis and so, a supporter of the Cartesian hypothesis is in fact likely to disagree with it. Moreover, a Cartesian supporter is not going to compare which out of Belief and Doubt is quicker or easier. Because he believes (quoting from the passage): 'the mental effort required to create belief and disbelief is the same.'\nD. This option is incorrect. This statement is entirely unrelated to the Cartesian hypothesis. It is in fact contradictory to a research finding mentioned in the last paragraph of the passage.\nE. This option is incorrect. A skeptical person would be one who is inclined to doubt everything. A credulous person would be one who is inclined to believe everything. Inclinations are automatic, passive. The Cartesian hypothesis in fact suggests that human beings are neither inclined to doubt nor inclined to believe. Their belief or disbelief is the result of considered analysis, not of passive inclinations.",
          "difficulty": "Challenging"
        },
        {
          "id": 10,
          "question": "Unlike the Spinozan hypothesis, the Cartesian hypothesis suggests that at any point in time, a human mind may contain some",
          "answers": [
              "ununderstood propositions that are believed",
              "ununderstood propositions that are neither believed nor disbelieved",
              "understood propositions that are believed",
              "understood propositions that are disbelieved",
              "understood propositions that are neither believed nor disbelieved"
          ],
          "type": "Verbal Reasoning - Reading Comprehension",
          "correct": 4,
          "explanation": "Cartesian Hypothesis\tSpinozan Hypothesis\nStage 1 (Automatic, Passive)\tComprehension\n-Input: Presented proposition\n- Output: Comprehended proposition\tComprehension-Belief\n- Input: Presented proposition\n- Output: Belief\nStage 2 (Willful, Effortful)\tAssessment\n- Input: Comprehended proposition\n- Output: Belief/Disbelief\tAssessment\n- Input: Belief\n- Output: Belief/Disbelief\nFrom the table, we see that under:\n\nThe Cartesian hypothesis, the mind may contain:\n-Comprehended propositions that have still not entered Stage 2\n- Beliefs\n- Disbeliefs\nThe Spinozan hypothesis, the mind may contain:\n- Beliefs\n-Disbeliefs\n(Under both the hypotheses, the Presented proposition (input of Stage 1) is automatically converted into Comprehended proposition. So, under neither system can the mind contain 'presented but not-comprehended-yet propositions.' This is a point of similarity between the two hypotheses.)\n\nSo, we see that the only point of difference between the two hypotheses regarding the content of mind is that Cartesian hypothesis allows for the presence of Comprehended propositions that have still not entered Stage 2.\n\nLet us now analyze the options one by one.\n\nA. This option is incorrect. Both hypotheses suggest that propositions are automatically understood. So, the mind does not have any ununderstood propositions.\nB. This option is incorrect. Both hypotheses suggest that propositions are automatically understood. So, the mind does not have any ununderstood propositions.\nC. This option is incorrect. Under both the hypotheses, it is possible for the mind to contain beliefs (understood propositions that are believed). Thus, this is a point of similarity between the two hypotheses and not of difference.\nD. This option is incorrect. Under both the hypotheses, it is possible for the mind to contain disbeliefs (understood propositions that are disbelieved). Thus, this is a point of similarity between the two hypotheses and not of difference.\nE. This option is correct. This statement is in accordance with the thinking that we had done before looking at the options. 'Comprehended propositions that have still not entered Stage 2' are the propositions that have still not been assessed to be true or false, and so, which are neither believed nor disbelieved.",
          "difficulty": "Challenging"
        },
        {
          "id": 11,
          "question": "Which of the following statements about an understandable and false proposition is not supported by the Spinozan hypothesis?",
          "answers": [
            "Its comprehension is a prerequisite for its rejection.",
            "Its comprehension does not require effort.",
            "Its acceptance occurs before its rejection.",
            "Its comprehension is automatically followed by its acceptance.",
            "Its rejection does not happen automatically."
          ],
          "type": "Verbal Reasoning - Reading Comprehension",
          "correct": 3,
          "explanation": "According to the Spinozan Hypothesis, understanding a proposition is linked with automatically accepting it. Therefore, comprehension is immediately followed by belief, not just comprehension alone.",
          "difficulty": "Challenging"
        },
        {
          "id": 12,
          "question": "It can be inferred from the Spinozan hypothesis that when exposed to understandable but suspicious propositions, a person who is too distracted or tired to exert much mental effort is:",
          "answers": [
            "less likely to comprehend them than when he is alert and mentally fresh",
            "more likely to comprehend them than when he is alert and mentally fresh",
            "more likely to be uncertain and uncommitted about their truth-value than when he is alert and mentally fresh",
            "more likely to believe them than when he is alert and mentally fresh",
            "more likely to disbelieve them than when he is alert and mentally fresh"
          ],
          "type": "Verbal Reasoning - Reading Comprehension",
          "correct": 3,
          "explanation": "Under the Spinozan hypothesis, belief occurs automatically in Stage 1. If a person is tired and unable to engage in the effortful assessment required in Stage 2, they are likely to remain in their default state of belief.",
          "difficulty": "Challenging"
        },
        {
          "id": 13,
          "question": "It can be inferred from the passage that to make his target customers believe his advertisements, an advertiser should:",
          "answers": [
            "convey the message only using words familiar to the target customers",
            "convey the message using the traditional motifs of the target customers",
            "not use any negative words in his message",
            "not distract the customer's mind by use of images or stories",
            "not overwhelm the customer's mind by presenting a lot of information"
          ],
          "type": "Verbal Reasoning - Reading Comprehension",
          "correct": 0,
          "explanation": "The passage suggests that to make a message believable, it must be understandable. Using familiar words ensures that the target customers can comprehend the message, which is crucial for it to be believed.",
          "difficulty": "Challenging"
        },
        {
          "id": 14,
          "question": "The author of the passage",
          "answers": [
            "supports the Cartesian hypothesis",
            "supports the Spinozan hypothesis",
            "has a neutral stance towards the two hypotheses",
            "rejects both the hypotheses",
            "belongs to the scientific community"
          ],
          "type": "Verbal Reasoning - Reading Comprehension",
          "correct": 1,
          "explanation": "He begins the last paragraph by telling us that a debate still goes on about the two hypotheses. Then, he uses the contrast word 'however.' This word implies that he doesn't really think the matter is so debatable, meaning that he thinks there is a clear winner among the two hypotheses. Which is the winner, as per him? The three statements he makes next tell us (simplified versions, quoted from the Passage Analysis):\n\n1. It's a common observation that disbelief is hard while belief is easy and automatic.\n2. Research has proved the inherent tendency of the human mind to believe.\n3. Advertising and Propaganda exist because human beings are inherently inclined to believe\n\nThese are all Spinozan assertions.\n\nThus, the last paragraph suggests that the author is a supporter of the Spinozan hypothesis.\n\nLet us analyze the options one by one.\n\nA. This option is incorrect. Rejected on the basis of the above discussion.\nB. This option is correct. Accepted on the basis of the above discussion.\nC. This option is incorrect. Rejected on the basis of the above discussion.\nD. This option is incorrect. Rejected on the basis of the above discussion.\nE. This option is incorrect. The author only mentions the scientific community in the context of the Cartesian hypothesis's prevalence. It would be wrong to infer from this sole mention that he belongs to this community.\nSolution (Passage Analysis)\n\nThis is a difficult long passage on philosophy. Taking into account the difficulty of the passage and the number of questions, you should have spent 10-12 minutes on this passage.\n\nIntroduction:\n\nThe passage starts by defining belief: to believe something means to accept it to be true. Then, it defines 'understandable proposition' – this is a proposition that is grammatically correct and is expressed in known words. So, this is a proposition that we are likely to understand. (For example, if you don't know Chinese, there is no chance that you will be able to understand a proposition expressed in Chinese.)\n\nThen, the passage gets into the question of how the human mind believes or disbelieves a proposition. It presents two hypotheses for how this happens – the Cartesian Hypothesis and the Spinozan Hypothesis.\n\nThe Cartesian Hypothesis:\n\nMost of the scientific community favors this hypothesis. It was originally suggested by René Descartes.\n\nAs per the Cartesian Hypothesis, as soon as an understandable proposition is presented to the mind, the mind understands it. So, as soon as you hear that \"corn flakes have health benefits,\" you automatically process the meaning of those words and that claim. This comprehension happens passively, that is, outside our willful control. We cannot choose to not understand a proposition, if that proposition is made in a grammatically correct way, using words we know.\n\nThis is Stage 1. Its output is Comprehended Proposition.\n\nIn Stage 2, we logically assess whether the proposition is true or false. Note that while Stage 1 was passive, Stage 2 is active and deliberate. If, upon assessing the proposition, we find it to be true, we will believe it (follows from the definition of belief); else, we will disbelieve it. Thus, the output of Stage 2 is either 'Belief (in the proposition)' or 'Disbelief.'\n\nThus, as per this hypothesis,'Belief' and 'Disbelief' come into being at the end of Stage 2. Also, since they are the alternative outcomes of the same process (assessment), and it is this process that is effortful, both belief and disbelief come into being with the same amount of effort.\n\nAlso, till the output of Stage 1 (comprehended proposition) does not become the input of Stage 2, the intellect neither affirms it (judges it to be true) nor denies it (judges it to be false). Such judgment only happens in Stage 2. So, till this stage starts, the Comprehended Proposition remains unjudged, and so it is neither a believed nor disbelieved yet.\n\nThe Spinozan Hypothesis:\n\nSuggested by Baruch Spinoza.\n\nAs per this hypothesis, Stage 1 involves both comprehension and belief. Spinoza says that we cannot understand a proposition like \"corn flakes have health benefits\" till we, at least temporarily, believe in it. He too believes that Stage 1 happens automatically and passively (outside our willful control).\n\nSo, in this hypothesis, Stage 1 is Comprehension-Belief. The output of this stage therefore is Belief.\n\nIn Stage 2, which is deliberate, we logically assess our belief in this proposition. If we find the proposition to be false, we reject our earlier acceptance – in other words, we turn our earlier (automatic) belief into disbelief. If we find it to be true, we continue believing in it.\n\nSo, in this hypothesis, Belief happens in the automatic and passive Stage 1, while Disbelief – if it happens – happens in the willful, effortful Stage 2.\n\nThus, the default setting of the human mind is Belief in every incoming proposition.\n\nSummary Comparison\n\nWe can tabulate the main points of the 2 hypotheses as under:\n\nCartesian Hypothesis\nStage 1 (Automatic, Passive)\n- Input: Presented proposition\n- Output: Comprehended proposition\nStage 2 (Willful, Effortful)\n- Input: Comprehended proposition\n- Output: Belief/Disbelief\n\nSpinozan Hypothesis\nStage 1 (Automatic, Passive)\n- Input: Presented proposition\n- Output: Belief\nStage 2 (Willful, Effortful)\n- Input: Belief\n- Output: Belief/Disbelief\n\nThe final paragraph:\n\nThe author starts the last paragraph by telling us that the jury is still out on which of the two hypotheses is correct. Then, he makes three points:\n\n1. (Doubt, suspension of judgment and disbelief) – require a lot of mental effort while (Acceptance and Belief) – come naturally to us. Or, simply put: Disbelief is hard while belief is easy and automatic.\n2. Research has proved that our consistent error is that we are prone to believing too much and not rejecting too much.\n3. The next line starts with the phrase 'this inherent credulity.' The word 'this' in the phrase refers to the research findings described in the second sentence. So, we can rewrite the second sentence as: Research has proved the inherent credulity of the human mind.\nOr, to use the more familiar words: Research has proved the inherent tendency of the human mind to believe.\n4. This inherent credulity of the human mind is the basic truth on which the fields of advertising and propaganda are founded. That is, the advertisers and propagandists did not believe that human minds have an inherent tendency to believe all they hear, see and read, their fields would not exist.",
          "difficulty": "Challenging"
        }
      ]
    },
    {
      "id": 15,
      "question": "A magazine, as part of a survey, asked the reasons of the readers working late and the effect of their absence from home affecting their families.",
      "answers": [
        "the reasons of its readers working late and the effect of their absence from home affecting their families",
        "its readers why they worked late and their absence from home affecting their families",
        "why its readers work late and the ways in which their absence from home affects their families",
        "the reasons why its readers worked late and how their absence from home had affected their families",
        "its readers why they work late and how their absence from home affects their families"
      ],
      "type": "Verbal Reasoning - Sentence Correction",
      "correct": 4,
      "explanation": "Explanation\n\nMeaning of the sentence: The sentence mentions a survey conducted by a magazine. The survey asks the readers of the magazine: (a) why they work late and (b) how their absence from home affects their families.\n\nThe sentence has two parts, mentioned above, that follow the verb asked. Both the parts need to be parallel for the sentence to be grammatically correct; they have to be either verb phrases or noun phrases. Additionally, the object of the verb asked is readers and not reasons. Lastly, the verb tenses in both the parts need to be the same.",
      "difficulty": "Challenging"
    },
    {
      "id": 16,
      "question": "But those whom willingly undertake an honest assessment of the era today are also part of an important British tradition which, though not largely forgotten, has been pushed to the limits.",
      "answers": [
        "But those whom willingly undertake an honest assessment of the era today are also part of an important British tradition which, though not largely forgotten, has been pushed to the limits.",
        "But those who are willing to undertake an honest assessment of the era today are also part of an important British tradition that, if not largely forgotten, has been pushed to the margins.",
        "But, those whom are undertaking an honest assessment of the era today willingly are also part of an important British tradition which, if not largely forgotten, has been marginalized.",
        "But those who willingly take over an honest assessment of the era today, also being part of an important British tradition which, although not largely forgotten, has been forced to the edges.",
        "But those whom are willing to undertake an honest assessment of the era today are also part of an important British tradition which, in spite of being not largely forgotten, has been pushed to the brim."
      ],
      "type": "Verbal Reasoning - Sentence Correction",
      "correct": 1,
      "explanation": "Explanation\n\nMeaning of the sentence: The sentence implies that all those people who are willing to honestly assess today's era are also part of an important British tradition, which many have forgotten.\n\nDiction: Whom is an objective pronoun that is used when you intend to refer to the object of a verb or preposition. To decide whether the sentence requires who or whom, flip the sentence into a question. Now, answer the question. If the answer is he or she, you require who. If the answer is him or her, you require whom. For example, consider the following sentence:\n\nQ: Who/whom did she marry?\n\nA: She married him.\n\nSince the answer is him, you require the objective pronoun whom.\n\nFlipping the given option into a question, we get the following sentence:\n\nQ: Who/whom is willing to undertake…\n\nA: He/she is willing to undertake…\n\nSince our answer is he or she, the correct pronoun is who.\n\nOptions A, C and E use the incorrect pronoun whom, so they can be ruled out.\n\nLogical Prediction: The sentence makes a reference to a British tradition and describes it as one that has been almost forgotten. To emphasize the point, the phrase if not largely forgotten, has been pushed to the margins has been used. Although and though do not bring out the contrast that is intended in the sentence. Similarly, in spite of not being largely forgotten, doesn't fit in logically with the intended meaning and is wordy.\n\nOptions A, D and E contain this error.\n\nIdioms: Marginalized, as used in option C, is incorrect to be used to describe a tradition. The word is usually used to describe people, groups or concepts that are treated as insignificant or peripheral. Take over, as used in option D, has a completely different meaning (assuming control over something). Undertake is the correct verb here.",
      "difficulty": "Challenging"
    },
    {
      "id": 17,
      "question": "The Brexit negotiations are faltering and the UK government's hopes to opening talks on a future trade deal with the EU this autumn looks likely to be increasingly dashed, the EU's chief negotiator, Michel Barnier, has reported back to the bloc's member states.",
      "answers": [
        "hopes to opening talks on a future trade deal with the EU this autumn looks likely to be increasingly dashed",
        "hopes of opening talks on a future trade deal with the EU looks increasingly likely to be dashed this autumn",
        "hopes to open talks on a future trade deal with the EU this autumn look likely to be increasingly dashed",
        "hopes of opening talks on a future trade deal this autumn with the EU look likely to be dashed increasingly",
        "hopes of opening talks on a future trade deal with the EU this autumn look increasingly likely to be dashed"
      ],
      "type": "Verbal Reasoning - Sentence Correction",
      "correct": 4,
      "explanation": "Explanation\n\nMeaning of the sentence: EU's chief negotiator has reported that Brexit negotiations are faltering, and the UK government's hopes to talk to EU this autumn about a future trade deal are likely to be dashed.\n\nThe plural noun hopes requires the plural verb look for the sentence to have an agreement between the subject and the verb. The modifiers this autumn and increasingly should be placed appropriately for the sentence's meaning to come through. The modifier this autumn should modify talks with EU. Similarly, increasingly should modify likely.",
      "difficulty": "Challenging"
    }
];