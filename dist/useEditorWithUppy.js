function p(a, s = {}, r) {
  const n = [], u = (t) => t.isRemote || !(t.data instanceof Blob) ? !1 : /^image/.test(t.type) && !/svg/.test(t.type), i = () => {
    const t = n[0];
    t && t();
  }, c = (t) => {
    n.push(function() {
      const o = a({
        ...s,
        src: t.data
      });
      o.on("hide", () => {
        n.shift(), i();
      }), o.on("processerror", console.log), o.on("process", ({ dest: e }) => {
        if (!e)
          return;
        const d = r ? r() : window.uppy;
        e.__handledByEditor = !0, d.addFile({
          data: e,
          name: e.name,
          type: e.type,
          size: e.size
        });
      });
    }), n.length === 1 && i();
  };
  return function(t) {
    return t.data.__handledByEditor || !u(t) ? !0 : (c(t), !1);
  };
}
export {
  p as default
};
