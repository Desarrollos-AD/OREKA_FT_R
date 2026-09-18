import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Boton } from "../Boton/Boton";
import { Icono } from "../Icono/Icono";
import { datosDeContacto } from "../../../datos/datosDeContacto";
import { areasDePractica } from "../../../datos/areasDePractica";
import "./Encabezado.scss";
import logoOreka from "/OREKA_Logo_Principal.png";

const ENLACES = [
  { to: "/", etiqueta: "Inicio" },
  { to: "/sobre-la-firma", etiqueta: "Sobre la Firma" },
  { to: "/abogados", etiqueta: "Abogados" },
];

export function Encabezado() {
  const [conFondo, setConFondo] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [serviciosAbierto, setServiciosAbierto] = useState(false);
  const contenedorServiciosRef = useRef(null);
  const { pathname } = useLocation();
  const enServicios = pathname === "/servicios";

  useEffect(() => {
    const alDesplazar = () => setConFondo(window.scrollY > 24);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  // Cierra el menú móvil al cambiar de tamaño a escritorio.
  useEffect(() => {
    const alRedimensionar = () => {
      if (window.innerWidth >= 768) setMenuAbierto(false);
    };
    window.addEventListener("resize", alRedimensionar);
    return () => window.removeEventListener("resize", alRedimensionar);
  }, []);

  // Cierra el desplegable de escritorio al hacer clic fuera de él.
  useEffect(() => {
    if (!serviciosAbierto) return undefined;

    const alHacerClic = (evento) => {
      if (!contenedorServiciosRef.current?.contains(evento.target)) {
        setServiciosAbierto(false);
      }
    };
    document.addEventListener("mousedown", alHacerClic);
    return () => document.removeEventListener("mousedown", alHacerClic);
  }, [serviciosAbierto]);

  // Cierra cualquier menú/desplegable abierto al cambiar de ruta.
  useEffect(() => {
    setMenuAbierto(false);
    setServiciosAbierto(false);
  }, [pathname]);

  const cerrarTodo = () => {
    setMenuAbierto(false);
    setServiciosAbierto(false);
  };

  return (
    <header className={`encabezado ${conFondo ? "encabezado--con-fondo" : ""}`}>
      <div className="encabezado__franja">
        <div className="encabezado__franja-interior">
          <a
            className="encabezado__dato"
            href={`tel:${datosDeContacto.telefono.replace(/\s/g, "")}`}
          >
            <Icono nombre="telefono" tamano={14} />
            {datosDeContacto.telefono}
          </a>
          <a
            className="encabezado__dato"
            href={`mailto:${datosDeContacto.email}`}
          >
            <Icono nombre="email" tamano={14} />
            {datosDeContacto.email}
          </a>
          <div className="encabezado__redes">
            <div className="pie-de-pagina__redes">
              {datosDeContacto.redes.map((red) => (
                <a
                  key={red.id}
                  href={red.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={red.etiqueta}
                >
                  <Icono nombre={red.id} tamano={25} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="encabezado__principal">
        <NavLink to="/" className="encabezado__logo" onClick={cerrarTodo}>
          <img src={logoOreka} alt="Logo Oreka" />
        </NavLink>

        <nav className="encabezado__nav" aria-label="Navegación principal">
          {ENLACES.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.to === "/"}
              className={({ isActive }) =>
                `encabezado__enlace ${isActive ? "encabezado__enlace--activo" : ""}`
              }
            >
              {enlace.etiqueta}
            </NavLink>
          ))}

          <div
            className={`encabezado__item-servicios ${serviciosAbierto ? "encabezado__item-servicios--abierto" : ""}`}
            ref={contenedorServiciosRef}
          >
            <button
              type="button"
              className={`encabezado__enlace encabezado__enlace--desplegable ${enServicios ? "encabezado__enlace--activo" : ""}`}
              aria-expanded={serviciosAbierto}
              aria-controls="encabezado-submenu-servicios"
              onClick={() => setServiciosAbierto((valor) => !valor)}
            >
              Servicios
              <Icono
                nombre="flechaAbajo"
                tamano={14}
                className="encabezado__flecha-desplegable"
              />
            </button>

            <div
              id="encabezado-submenu-servicios"
              className="encabezado__submenu"
              role="menu"
            >
              {areasDePractica.map((area) => (
                <NavLink
                  key={area.id}
                  to={`/servicios#${area.id}`}
                  role="menuitem"
                  className="encabezado__submenu-enlace"
                  onClick={() => setServiciosAbierto(false)}
                >
                  {area.titulo}
                </NavLink>
              ))}
              <NavLink
                to="/servicios"
                role="menuitem"
                className="encabezado__submenu-enlace encabezado__submenu-enlace--todas"
                onClick={() => setServiciosAbierto(false)}
              >
                Ver todos los servicios
                <Icono nombre="flecha" tamano={14} />
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="encabezado__acciones">
          <Boton to="/contacto" variante="primario" className="encabezado__cta">
            Agenda una Consulta
          </Boton>
          <button
            type="button"
            className="encabezado__disparador-menu"
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuAbierto((valor) => !valor)}
          >
            <Icono nombre={menuAbierto ? "cerrar" : "menu"} />
          </button>
        </div>
      </div>

      <nav
        id="menu-movil"
        className={`encabezado__menu-movil ${menuAbierto ? "encabezado__menu-movil--abierto" : ""}`}
        aria-label="Navegación móvil"
      >
        <div className="encabezado__menu-movil-interior">
          {ENLACES.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.to === "/"}
              className="encabezado__enlace-movil"
              onClick={cerrarTodo}
            >
              {enlace.etiqueta}
            </NavLink>
          ))}

          <div className="encabezado__item-servicios-movil">
            <button
              type="button"
              className="encabezado__enlace-movil encabezado__enlace-movil--desplegable"
              aria-expanded={serviciosAbierto}
              aria-controls="encabezado-submenu-servicios-movil"
              onClick={() => setServiciosAbierto((valor) => !valor)}
            >
              Servicios
              <Icono
                nombre="flechaAbajo"
                tamano={16}
                className="encabezado__flecha-desplegable"
              />
            </button>

            <div
              id="encabezado-submenu-servicios-movil"
              className={`encabezado__submenu-movil ${serviciosAbierto ? "encabezado__submenu-movil--abierto" : ""}`}
            >
              <div className="encabezado__submenu-movil-interior">
                {areasDePractica.map((area) => (
                  <NavLink
                    key={area.id}
                    to={`/servicios#${area.id}`}
                    className="encabezado__submenu-enlace-movil"
                    onClick={cerrarTodo}
                  >
                    {area.titulo}
                  </NavLink>
                ))}
                <NavLink
                  to="/servicios"
                  className="encabezado__submenu-enlace-movil encabezado__submenu-enlace-movil--todas"
                  onClick={cerrarTodo}
                >
                  Ver todos los servicios
                </NavLink>
              </div>
            </div>
          </div>

          <Boton to="/contacto" variante="primario" onClick={cerrarTodo}>
            Agenda una Consulta
          </Boton>
        </div>
      </nav>
    </header>
  );
}
