export default function Bag(props) {

  return (
    <section className="display">
      <div className="bag">
        <canvas ref={props.canvasRef}></canvas>
      </div>
    </section>
  );
}
