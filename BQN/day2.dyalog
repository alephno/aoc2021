data←⊃⎕NGET'data.txt'1
f←1 0∘× ⋄ d←0 1∘× ⋄ u←0 ¯1∘×
×/⊃+/⍎¨data
down←{a+←⍵} ⋄ up←{a-←⍵} ⋄ forward←{h+←⍵ ⋄ dd+←a×⍵}
h dd a←0 ⋄ ⍎¨p ⋄ h×d
