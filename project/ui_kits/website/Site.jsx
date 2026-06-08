/* Lean Hippo website — app shell + routing. */
function useIsMobile() {
  const get = () => (typeof window !== "undefined") &&
    (window.LH_FORCE_MOBILE === true || window.matchMedia("(max-width: 1080px)").matches);
  const [mobile, setMobile] = React.useState(get);
  React.useEffect(() => {
    const on = () => setMobile(get());
    window.addEventListener("resize", on);
    const mq = window.matchMedia("(max-width: 1080px)");
    mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
    return () => { window.removeEventListener("resize", on); mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on); };
  }, []);
  React.useEffect(() => {
    document.body.classList.toggle("mobile", mobile);
    if (window.LH_FORCE_MOBILE) document.body.classList.add("force-mobile");
  }, [mobile]);
  return mobile;
}

function SiteApp() {
  const [route, setRoute] = React.useState("home");
  const [mindOpen, setMindOpen] = React.useState(false);
  const [booking, setBooking] = React.useState({ open: false, service: "bottleneck" });
  const mobile = useIsMobile();
  const openBooking = (service) => setBooking({ open: true, service: service || "bottleneck" });
  const closeBooking = () => setBooking((b) => ({ ...b, open: false }));

  const go = (r, anchor) => {
    setRoute(r);
    const scroller = document.querySelector("#site-scroll");
    requestAnimationFrame(() => {
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el && scroller) {
          const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - (mobile ? 76 : 90);
          scroller.scrollTo({ top, behavior: "smooth" });
          return;
        }
      }
      if (scroller) scroller.scrollTo({ top: 0, behavior: anchor ? "smooth" : "auto" });
    });
  };

  React.useEffect(() => { if (window.LHNetwork) window.LHNetwork.init(); }, [route, mobile]);

  const shared = { go, onMind: () => setMindOpen(true), onBook: openBooking };

  return (
    <React.Fragment>
      <Nav route={route} mobile={mobile} {...shared} />
      <div id="site-scroll" style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
        {route === "home"
          ? <Landing {...shared} mobile={mobile} />
          : <BusinessSystems {...shared} mobile={mobile} />}
        <Footer {...shared} />
      </div>
      <MindFab onClick={() => setMindOpen(true)} />
      <MindPanel open={mindOpen} onClose={() => setMindOpen(false)} go={go} onBook={openBooking} />
      <BookingModal open={booking.open} onClose={closeBooking} initialService={booking.service} />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<SiteApp />);
