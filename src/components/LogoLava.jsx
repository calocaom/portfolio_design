import './LogoLava.css'

/**
 * Scroll phases:
 *   sun  — bright bubble behind the (opaque) hero GIF, then shrinks to nothing
 *   fill — returns at late bio and expands into a solid works tint
 */
export default function LogoLava({ sun = 0, fill = 0 }) {
  return (
    <div
      className="logo-lava"
      aria-hidden="true"
      style={{
        '--lava-sun': sun,
        '--lava-fill': fill,
      }}
    >
      <div className="logo-lava__stage">
        <span className="logo-lava__sun" />
        <span className="logo-lava__return" />
      </div>
    </div>
  )
}
