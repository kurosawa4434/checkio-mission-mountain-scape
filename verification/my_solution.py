from itertools import chain
from typing import List, Tuple


def mountain_scape(tops: List[Tuple[int, int]]) -> int:

    def make_triangle_nums(start_height, max_height, start_num):
        tri_ary = []
        left = -1 + ((start_height-1)*2)

        for i, ch in enumerate(range(start_height, max_height+1), start=0):
            row = [n+start_num for n in range(i*2+1)]
            tri_ary.append(row)
            start_num += (left := left+2)
        return tri_ary

    min_x = min(x-y for x, y in tops)
    max_x = max(x+y for x, y in tops)
    total_height = (max_x - min_x)//2
    all_nums = make_triangle_nums(1, total_height, 1)
    tgt_nums = set()
    for x, y in tops:
        tgt_nums |= set(chain(*(make_triangle_nums(total_height-y+1, total_height, all_nums[total_height-y][x-(min_x+y)]))))

    return len(tgt_nums)


if __name__ == '__main__':
    print("Example:")
    print(mountain_scape([(1, 1), (4, 2), (7, 3)]))

    # These "asserts" are used for self-checking and not for an auto-testing
    assert mountain_scape([(1, 1), (4, 2), (7, 3)]) == 13
    assert mountain_scape([(0, 2), (5, 3), (7, 5)]) == 29
    assert mountain_scape([(1, 3), (5, 3), (5, 5), (8, 4)]) == 37
    print("Coding complete? Click 'Check' to earn cool rewards!")
