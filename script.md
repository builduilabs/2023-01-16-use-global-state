# Dead-simple global state, and when to use it

Today I want to talk about a really nice library I like to use for global state in React apps, but first let's look at some motivation for when you'd want to use it.

## Motivation

Motivate the problem...  so we've lost our comment text.

So this is the problem we want to solve. Add a comment, write text, switch issues, lose comment.

Wouldn't it be nice if we kept the comment?

---

Let's take a look at the code. Explain.


## Step 1

Wouldn't it be nice if when we came back, we still have the text we wrote? This is where the idea of global state comes in, and this awesome library called react-hooks-global-state.

Let's install it

```sh
npm install react-hooks-global-state
```

```jsx
let { useGlobalState } = createGlobalState({
  newCommentText: "",
});

function NewComment({ onCancel }: { onCancel: () => void }) {
  const [newCommentText, setnewCommentText] = useGlobalState("newCommentText");
```

Boom!!

## Something

or non-local state comes in.



## Motivation

I haven't set up context in a while

From the author/maintainer of Jotai/Valtio/Zustand

https://github.com/dai-shi/react-hooks-global-state


## Clear on cancel?



## Use cases

- Panel is open, switches/toggles, other ephemeral state
- useCurrentUser initialized in \_app
