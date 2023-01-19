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

and now we can use `createGlobalState` to create some state that's not tied to our component instance.

Now this takes in an object with different keys we can use to store different global state, lets use text. This returns a bunch of stuff including useGlobalState.

```jsx
let { useGlobalState } = createGlobalState({
  newCommentText: "",
});

function NewComment({ onCancel }: { onCancel: () => void }) {
  const [newCommentText, setnewCommentText] = useGlobalState("newCommentText");
```

Let's check this out. Add comment, come over to Issue 2, component tears down... come back to 1, click Add comment...

Boom! Text is there. Isn't that awesome? Explain

## Step 2

This is cool, except, come to Issue 2. Woops, thats a problem. So we really want to scope this state to the issue.

Instead of a single value for the new comment text let's make a draft comments object that we can use to key each comment by the issue id:

```jsx
draftComments: { "1": "comment for 1", "2": "c" },
```

Update this:

```jsx
let [draftComments, setDraftComments] = useGlobalState("draftComments");
```

And now we need the issueId to look up the text for this issue. Pass in and expose.

Now update value:

```jsx
value={draftComments[issueId]}
```

Typescript is telling us draftComments is an empty object {} but its really a dynamic object. `createGlobalState` takes in a type parameter we can use to properly type this: draftComments is a record with string keys and string values for the text.

```tsx
let { useGlobalState } = createGlobalState<{
  draftComments: Record<string, string>;
}>({
  draftComments: {},
});
```

Now TS is happy, and we can update our change handler

```tsx
onChange={(e) =>
  setDraftComments({
    ...draftComments,
    [issueId]: e.target.value,
  })
}
```

Then update the alert.

So cool, share this across app – for example, let's default showing the comment box if there's a draft comment for the issue:


```tsx
const { useGlobalState } = createGlobalState<{
  draftComments: Record<string, string>;
}>({
  draftComments: {},
});

export { useGlobalState };

// [issue].tsx
let [isShowingNewComment, setIsShowingNewComment] = useState(
  draftComments[issue.id]
);
```

So yeah see that this is powerful, perfect for ephemeral state. Smooth complexity gradient.

Don't have to wire up context. You might have used jotai/valtio/zustand/redux but this is a Super simple api, love the gentle curve from useState ot useGlobalState. I've used this for things like

- panel is open, switches and toggles and other phemeral state
- even initializing useCurrentUser in _app and making it globally, since that's something that's not really tied to any single component being rendered.
- One cool little detail: This is actually a store if you've heard of `useSyncExternalStore` so there's no tearing in concurrent mode. IF you want ot learn more check the links, I have some other videos explaining that.


https://github.com/dai-shi/react-hooks-global-state


## Clear on cancel?



## Use cases

- Panel is open, switches/toggles, other ephemeral state
- useCurrentUser initialized in \_app
