export default function Sidebar(props) {
  return (
    <section className="sidebar">
      <input type="color" value={props.bgColor} onChange={props.onChangeBg} />
      <input type="file" accept="image/*" onChange={props.onChangeImg} />
    </section>
  );
}
