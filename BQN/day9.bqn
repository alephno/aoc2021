h ← 5‿10⥊⟨
2,1,9,9,9,4,3,2,1,0,
3,9,8,7,8,9,4,9,2,1,
9,8,5,6,7,8,9,8,9,2,
8,7,6,7,8,9,6,7,8,9,
9,8,9,9,9,6,5,6,7,8
⟩
col ← ≠⍉h
d ← h<(10«⍟col↕col)«h
u ← h<(10»⍟col↕col)»h
l ← h<(10»˘(1«»≢h)⥊↕≠h)»˘h
r ← h<(10»˘(1«»≢h)⥊↕≠h)«˘h
# Part 1
#+´+´˘((d∧u∧l∧r)×(h+1))
# Part 2 got the basins but how do I do a flood fill in BQN?
b ← ((u∨d)∧(l∨r))∧¬(9=h)