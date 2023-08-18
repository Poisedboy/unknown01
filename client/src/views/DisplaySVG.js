export function DisplaySVG({ path, style }) {
  return (
    <img
      src={path}
      alt="icon"
      style={style ? style : { width: "25px", height: "25px" }}
    />
  );
}
