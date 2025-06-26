# \<clip-path\>

I have an idea where I want to use the easiest shape for my UI. A simple rectangle. Now I know that a rectangle looks boring, so I need a way to make it look interesting or at least make it obvious that this design approach is intentional.

So what I am going to do is use a colorful gradient as a background. On to of this background is a black sheet, covering everything up. Now the interesting part is, that in my graph view, the vertices are like cutouts from the black sheet revealing the colorful background underneath. Since my graph view is animated, and the colorful background is a gradient, when the vertices are moving around, the user will see a slight change in color as the move.

To create this effect, I want to use `<clip-path>`.

## How to use it

My vertices are at the moment `<rect>` SVG Elements, but will be replaced by `<clipPath>` SVG Elements. Once I have a `<clipPath>` SVG Element with an ID, I can specify a `<clip-source>` URL.

## Grainy effect with Perlin Noise

## Square vertices and their edges

![Edge cases](/home/jakobh/git/graph-note/docs/edge-cases.svg)

```typescript
const a1 = Point(A.x, A.y);
const a2 = Point(A.x + A.width, A.y);
const a3 = Point(A.x, A.y + A.height);
const a4 = Point(A.x + A.width, A.y + A.height);

const b1 = Point(B.x, B.y);
const b2 = Point(B.x + B.width, B.y);
const b3 = Point(B.x, B.y + B.height);
const b4 = Point(B.x + B.width, B.y + B.height);

/* Because they are rectangles
a1.x == a4.x --> A.left
a2.x == a3.x --> A.right
a1.y == a2.y --> A.top
a3.y == a4.y --> A.bottom
*/

let anchorA : Point;
let anchorB : Point;

if (A.top > B.bottom) {
	if (A.left > B.right) {
        anchorA = A.topLeft;
        anchorB = B.bottomRight;
    } else if (A.left > B.left && A.left < B.right) {
        const x = A.left + Math.abs(A.left - B.right) / 2;
        anchorA = Point(x, A.top);
        anchorB = Point(x, B.bottom);
    } else if (A.right > B.left && A.right < B.right) {
        const x = A.right - Math.abs(A.right - B.left) / 2;
        anchorA = Point(x, A.top);
        anchorB = Point(x, B.bottom);
    } else if (A.right < B.left) {
        anchorA = A.topRight;
        anchorB = B.bottomLeft;
    }
} else if (A.top > B.top && A.top < B.bottom) {
   	const y = A.top + Math.abs(A.top - B.bottom) / 2;
    if (A.left > B.right) {
        anchorA = Point(A.left, y);
        anchorB = Point(B.right, y);
    } else if (A.right < B.left) {
        anchorA = Point(A.right, y);
        anchorB = Point(B.left, y);
    }
} else if (A.bottom > B.top && A.bottom < B.bottom) {
   	const y = A.bottom - Math.abs(A.bottom - B.top) / 2;
    if (A.left > B.right) {
        anchorA = Point(A.left, y);
        anchorB = Point(B.right, y);
    } else if (A.right < B.left) {
        anchorA = Point(A.right, y);
        anchorB = Point(B.left, y);
    }
} else if (A.bottom < B.top) {
    if (A.right < B.left) {
        anchorA = A.bottomRight;
        anchorB = B.topLeft;
    } else if (A.left > B.left && A.left < B.right) {
        const x = 0;
        anchorA = Point(x, A.bottom);
        anchorB = Point(x, B.top);
    } else if (A.right > B.left && A.right < B.right) {
        const x = 0;
        anchorA = Point(x, A.bottom);
        anchorB = Point(x, B.top);
    } else if (A.left > B.right) {
        anchorA = A.bottomLeft;
        anchorB = B.topRight;
    }
}

connect(anchorA, anchorB);
```

```typescript
let vector = A.middle.direction(B.middle);
vector.scale(A.middle.distanceTo(B.middle));

if (Math.abs(vector.x) <= A.width + B.width) {
    anchorA.x = A.middle.x + vector.x / 2
	anchorB.x = A.middel.x + vector.x / 2
} else {
    if (x > 0) {
        anchorA.x = A.right;
        anchorB.x = B.left;
    } else {
        anchorA.x = A.left;
        anchorB.x = B.right;
    }
}

if (Math.abs(vector.y) <= A.height + B.height) {
	anchorA.y = A.middle.y + vector.y / 2
	anchorB.y = A.middle.y + vector.y / 2
} else {
    if (y > 0) {
        anchorA.y = A.bottom:
        anchorB.y = B.top:
    } else {
        anchorA.y = A.top:
        anchorB.y = B.bottom:
    }
}

connect(anchorA, anchorB);
```

