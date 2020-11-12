"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""
from random import randint
from my_solution import mountain_scape


def make_random_tests(num):
    random_tests = []
    for _ in range(num):
        tops = []
        for _ in range(randint(3, 50)):
            x, y = 0, 1
            while (x + y) % 2:
                x = randint(0, 100)
                y = randint(1, randint(10, 50))
            tops.append([x, y])

        print(tops)
        random_tests.append({
            "input": tops,
            "answer": mountain_scape(tops)
        })
    return random_tests


TESTS = {
    "Randoms": make_random_tests(10),
    "Basics": [
        {
            "input": [[1, 1], [4, 2], [7, 3]],
            "answer": 13,
        },
        {
            "input": [[0, 2], [5, 3], [7, 5]],
            "answer": 29,
        },
        {
            "input": [[1, 3], [5, 3], [5, 5], [8, 4]],
            "answer": 37,
        },
    ],
}
