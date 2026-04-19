export default function Sidebar(props) {
  return (
    <section className="sidebar">
      <input type="file" accept="image/*" onChange={props.onChangeImg} />
      <input
        type="text"
        name="text"
        placeholder={props.bagText}
        onChange={props.onChangeText}
      />
    </section>
  );
}
