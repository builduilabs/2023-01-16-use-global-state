I haven't set up context in a while

From the author/maintainer of Jotai/Valtio/Zustand

https://github.com/dai-shi/react-hooks-global-state

```sh
npm install react-hooks-global-state
```

From

```jsx
const [newCommentText, setnewCommentText] = useState("");
```

To

```jsx
let { useGlobalState } = createGlobalState({
  newCommentText: "",
});

function NewComment({ onCancel }: { onCancel: () => void }) {
  const [newCommentText, setnewCommentText] = useGlobalState("newCommentText");
```

Boom!!

- Panel is open, switches/toggles, other ephemeral state
- useCurrentUser initialized in \_app
