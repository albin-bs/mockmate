// src/data/problems.ts

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface SampleIO {
  input: string;
  output: string;
  explanation: string;
}

export interface ProblemConfig {
  id: string;
  slug: string;
  title: string;
  number: number; // Add this for display
  difficulty: Difficulty;
  description: string;
  samples: SampleIO[];
  constraints: string[];
  edgeCases: string[];
  tags: string[]; // Add this for filtering
  acceptance: string; // Add this for stats
  locked: boolean; // Add this for premium problems
}

export const problems: ProblemConfig[] = [
  {
    id: "two-sum",
    slug: "two-sum",
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    acceptance: "49.2%",
    locked: false,
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may not use the same element twice and you can return the answer in any order.",
    samples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10^4",
      "-10^9 ≤ nums[i] ≤ 10^9",
      "-10^9 ≤ target ≤ 10^9",
    ],
    edgeCases: [
      "nums contains negative and positive numbers.",
      "Same value used twice at different indices.",
      "Target formed by first and last elements.",
    ],
  },
  {
    id: "add-two-numbers",
    slug: "add-two-numbers",
    number: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    tags: ["Linked List", "Math", "Recursion"],
    acceptance: "41.8%",
    locked: false,
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    samples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100]",
      "0 ≤ Node.val ≤ 9",
    ],
    edgeCases: [
      "Lists of different lengths",
      "Carry at the end",
    ],
  },
  {
    id: "longest-substring",
    slug: "longest-substring-without-repeating-characters",
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    acceptance: "34.1%",
    locked: false,
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    samples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3',
      },
    ],
    constraints: [
      "0 ≤ s.length ≤ 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces",
    ],
    edgeCases: [
      "Empty string",
      "All characters are same",
      "No repeating characters",
    ],
  },
  {
    id: "median-sorted-arrays",
    slug: "median-of-two-sorted-arrays",
    number: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    acceptance: "38.7%",
    locked: false,
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    samples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2",
      },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 ≤ m ≤ 1000",
      "0 ≤ n ≤ 1000",
    ],
    edgeCases: [
      "One array is empty",
      "Arrays have same elements",
    ],
  },
  {
    id: "valid-parentheses",
    slug: "valid-parentheses",
    number: 20,
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["String", "Stack"],
    acceptance: "40.5%",
    locked: false,
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets and open brackets must be closed in the correct order.",
    samples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string is valid",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "All brackets are properly closed",
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 10^4",
      "s consists of parentheses only '()[]{}'",
    ],
    edgeCases: [
      "Single opening bracket",
      "Mismatched closing bracket",
    ],
  },
  {
    id: "merge-intervals",
    slug: "merge-intervals",
    number: 56,
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    acceptance: "46.8%",
    locked: false,
    description:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    samples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]",
      },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10^4",
      "intervals[i].length == 2",
      "0 ≤ starti ≤ endi ≤ 10^4",
    ],
    edgeCases: [
      "All intervals overlap",
      "No overlapping intervals",
    ],
  },
  {
    id: "climbing-stairs",
    slug: "climbing-stairs",
    number: 70,
    title: "Climbing Stairs",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    acceptance: "52.1%",
    locked: false,
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    samples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways: 1 step + 1 step, or 2 steps",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "Three ways: 1+1+1, 1+2, or 2+1",
      },
    ],
    constraints: [
      "1 ≤ n ≤ 45",
    ],
    edgeCases: [
      "n = 1 (only one way)",
      "Large n requiring optimization",
    ],
  },
  {
    id: "reverse-linked-list",
    slug: "reverse-linked-list",
    number: 206,
    title: "Reverse Linked List",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    acceptance: "73.4%",
    locked: false,
    description:
      "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    samples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The list is reversed",
      },
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000]",
      "-5000 ≤ Node.val ≤ 5000",
    ],
    edgeCases: [
      "Empty list",
      "Single node",
    ],
  },
  {
    id: "regular-expression",
    slug: "regular-expression-matching",
    number: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    tags: ["String", "Dynamic Programming", "Recursion"],
    acceptance: "28.5%",
    locked: true, // Example of premium/locked problem
    description:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element.",
    samples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: '"a" does not match the entire string "aa"',
      },
    ],
    constraints: [
      "1 ≤ s.length ≤ 20",
      "1 ≤ p.length ≤ 20",
    ],
    edgeCases: [
      "Empty string with pattern",
      "Pattern with multiple stars",
    ],
  },
];

// Get all unique tags for filtering
export const allTags = [...new Set(problems.flatMap((p) => p.tags))].sort();
