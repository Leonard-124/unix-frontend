import { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const Icons = {
  add:    "M12 5v14M5 12h14",
  edit:   "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:  "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  eye:    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  close:  "M18 6 6 18M6 6l12 12",
  image:  "M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21",
  check:  "M20 6 9 17l-5-5",
  search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  user:   "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  art:    "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  refresh:"M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  sort:   "M3 6h18M7 12h10M11 18h2",
  grid:   "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  list:   "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
};

// ─── TOAST ───────────────────────────────────────────────────────────────────
const Toast = ({ toasts, remove }) => (
  <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
    {toasts.map(t => (
      <div key={t.id} onClick={() => remove(t.id)} style={{
        background: t.type === "error" ? "#ff3b47" : t.type === "warn" ? "#f59e0b" : "#00c896",
        color: "#fff", padding: "12px 20px", borderRadius: 10, cursor: "pointer",
        fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 600,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 10,
        animation: "slideIn 0.3s ease",
      }}>
        <span>{t.type === "error" ? "✗" : t.type === "warn" ? "⚠" : "✓"}</span>
        {t.msg}
      </div>
    ))}
  </div>
);

// ─── MODAL ───────────────────────────────────────────────────────────────────
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      backdropFilter: "blur(6px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0f0f0f", border: "1px solid #2a2a2a", borderRadius: 16,
        width: "100%", maxWidth: 700, maxHeight: "92vh", overflow: "auto",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #1e1e1e" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15, color: "#e8e8e8", letterSpacing: 1 }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#666", padding: 4 }}>
            <Icon d={Icons.close} size={20} />
          </button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
};

// ─── FIELD ───────────────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#888", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{label}</label>
    {children}
  </div>
);
const Input = ({ ...props }) => (
  <input {...props} style={{
    width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 8,
    color: "#e8e8e8", padding: "10px 14px", fontFamily: "'DM Mono', monospace", fontSize: 13,
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
    ...props.style,
  }} onFocus={e => e.target.style.borderColor = "#00c896"} onBlur={e => e.target.style.borderColor = "#2e2e2e"} />
);
const Textarea = ({ ...props }) => (
  <textarea {...props} rows={3} style={{
    width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 8,
    color: "#e8e8e8", padding: "10px 14px", fontFamily: "'DM Mono', monospace", fontSize: 13,
    outline: "none", resize: "vertical", boxSizing: "border-box",
  }} onFocus={e => e.target.style.borderColor = "#00c896"} onBlur={e => e.target.style.borderColor = "#2e2e2e"} />
);
const Select = ({ children, ...props }) => (
  <select {...props} style={{
    width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 8,
    color: "#e8e8e8", padding: "10px 14px", fontFamily: "'DM Mono', monospace", fontSize: 13,
    outline: "none", boxSizing: "border-box",
  }}>{children}</select>
);
const Btn = ({ children, variant = "primary", ...props }) => {
  const styles = {
    primary: { background: "#00c896", color: "#000" },
    danger:  { background: "#ff3b47", color: "#fff" },
    ghost:   { background: "#1e1e1e", color: "#ccc", border: "1px solid #2e2e2e" },
  };
  return (
    <button {...props} style={{
      ...styles[variant], border: "none", borderRadius: 8, padding: "9px 18px",
      fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 12, letterSpacing: 1,
      cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7,
      transition: "opacity 0.15s, transform 0.1s", textTransform: "uppercase",
      ...props.style,
    }} onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
      {children}
    </button>
  );
};

// ─── IMAGE UPLOAD ─────────────────────────────────────────────────────────────
const ImageUpload = ({ value, onChange }) => {
  const inputRef = useRef();
  return (
    <div>
      <div onClick={() => inputRef.current.click()} style={{
        border: "2px dashed #2e2e2e", borderRadius: 10, padding: 20, textAlign: "center",
        cursor: "pointer", transition: "border-color 0.2s",
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#00c896"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "#2e2e2e"}>
        {value ? (
          <img src={URL.createObjectURL(value)} alt="preview"
            style={{ maxHeight: 180, borderRadius: 8, objectFit: "contain" }} />
        ) : (
          <div style={{ color: "#555", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
            <Icon d={Icons.upload} size={28} color="#444" />
            <p style={{ margin: "8px 0 0" }}>Click to upload image</p>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
        onChange={e => onChange(e.target.files[0])} />
    </div>
  );
};

// ─── CONFIRM DELETE ───────────────────────────────────────────────────────────
const ConfirmModal = ({ open, name, onConfirm, onCancel }) => (
  <Modal open={open} onClose={onCancel} title="CONFIRM DELETE">
    <p style={{ fontFamily: "'DM Mono', monospace", color: "#aaa", fontSize: 13, marginBottom: 24 }}>
      You are about to permanently delete <span style={{ color: "#ff3b47", fontWeight: 700 }}>"{name}"</span>. This cannot be undone.
    </p>
    <div style={{ display: "flex", gap: 10 }}>
      <Btn variant="danger" onClick={onConfirm}>Delete</Btn>
      <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
    </div>
  </Modal>
);

// ─── VIEW DETAIL MODAL ────────────────────────────────────────────────────────
const ViewModal = ({ open, item, onClose, onEdit, onDelete }) => (
  <Modal open={open} onClose={onClose} title="ARTWORK DETAIL">
    {item && (
      <div>
        {item.image && (
          <img src={item.image} alt={item.name} style={{
            width: "100%", maxHeight: 320, objectFit: "cover", borderRadius: 10, marginBottom: 20,
          }} />
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            ["Name", item.name], ["Author", item.author], ["Inventor", item.inventor],
            ["Type", item.type], ["Price", item.price ? `₦${Number(item.price).toLocaleString()}` : "—"],
            ["Quantity", item.quantity], ["Size", item.size], ["Weight", item.weight],
          ].map(([k, v]) => v ? (
            <div key={k} style={{ background: "#1a1a1a", borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" }}>{k}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#e8e8e8" }}>{v}</div>
            </div>
          ) : null)}
        </div>
        {item.description && (
          <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "10px 14px", marginBottom: 20 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" }}>Description</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>{item.description}</div>
          </div>
        )}
        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={() => { onClose(); onEdit(item); }}>
            <Icon d={Icons.edit} size={14} /> Edit
          </Btn>
          <Btn variant="danger" onClick={() => { onClose(); onDelete(item); }}>
            <Icon d={Icons.trash} size={14} /> Delete
          </Btn>
        </div>
      </div>
    )}
  </Modal>
);

// ─── ART FORM ─────────────────────────────────────────────────────────────────
const ArtForm = ({ initial, onSubmit, loading }) => {
  const blank = { name: "", author: "", inventor: "", type: "painting", description: "", price: "", quantity: 1, size: "", weight: "" };
  const [form, setForm] = useState(initial || blank);
  const [img, setImg] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { if (initial) setForm(initial); }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form, img);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Name *">
          <Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Artwork name" required />
        </Field>
        <Field label="Type *">
          <Select value={form.type} onChange={e => set("type", e.target.value)}>
            {["painting", "sculpture", "photography", "digital", "illustration", "invention", "other"]
              .map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </Select>
        </Field>
        <Field label="Author">
          <Input value={form.author} onChange={e => set("author", e.target.value)} placeholder="Artist name" />
        </Field>
        <Field label="Inventor">
          <Input value={form.inventor} onChange={e => set("inventor", e.target.value)} placeholder="Inventor (if applicable)" />
        </Field>
        <Field label="Price (₦)">
          <Input type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="0.00" />
        </Field>
        <Field label="Quantity">
          <Input type="number" value={form.quantity} onChange={e => set("quantity", e.target.value)} min={1} />
        </Field>
        <Field label="Size">
          <Input value={form.size} onChange={e => set("size", e.target.value)} placeholder="e.g. 60x80cm" />
        </Field>
        <Field label="Weight">
          <Input value={form.weight} onChange={e => set("weight", e.target.value)} placeholder="e.g. 2kg" />
        </Field>
      </div>
      <Field label="Description">
        <Textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe this artwork..." />
      </Field>
      <Field label={initial?._id ? "Replace Image (optional)" : "Image *"}>
        <ImageUpload value={img} onChange={setImg} />
        {initial?.image && !img && (
          <img src={initial.image} alt="current" style={{ marginTop: 10, maxHeight: 100, borderRadius: 6, opacity: 0.7 }} />
        )}
      </Field>
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <Btn type="submit" style={{ opacity: loading ? 0.6 : 1 }}>
          <Icon d={initial?._id ? Icons.check : Icons.add} size={14} />
          {loading ? "Saving..." : initial?._id ? "Save Changes" : "Create Artwork"}
        </Btn>
      </div>
    </form>
  );
};

// ─── ARTWORKS TAB ─────────────────────────────────────────────────────────────
const ArtworksTab = ({ token, addToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/art`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { addToast("Failed to load artworks", "error"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const doCreate = async (form, img) => {
    if (!img) { addToast("Image is required", "warn"); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("image", img);
      const res = await fetch(`${API}/api/art`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      addToast("Artwork created!", "success");
      setCreateOpen(false);
      load();
    } catch (e) { addToast(e.message, "error"); }
    setSaving(false);
  };

  const doUpdate = async (form, img) => {
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (!["_id","image","publicId","auth0Id","createdAt","updatedAt","__v"].includes(k)) fd.append(k, v ?? ""); });
      if (img) fd.append("image", img);
      const res = await fetch(`${API}/api/art/${editItem._id}`, { method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      addToast("Artwork updated!", "success");
      setEditItem(null);
      load();
    } catch (e) { addToast(e.message, "error"); }
    setSaving(false);
  };

  const doDelete = async () => {
    try {
      const res = await fetch(`${API}/api/art/${deleteItem._id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      addToast("Artwork deleted", "success");
      setDeleteItem(null);
      load();
    } catch (e) { addToast(e.message, "error"); }
  };

  const filtered = items
    .filter(i => (!search || [i.name, i.author, i.type, i.description].join(" ").toLowerCase().includes(search.toLowerCase())))
    .filter(i => typeFilter === "all" || i.type === typeFilter)
    .sort((a, b) => sort === "newest" ? new Date(b.createdAt) - new Date(a.createdAt)
      : sort === "oldest" ? new Date(a.createdAt) - new Date(b.createdAt)
      : sort === "price-high" ? b.price - a.price
      : a.price - b.price);

  const types = ["all", ...new Set(items.map(i => i.type).filter(Boolean))];

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Icon d={Icons.search} size={15} color="#555" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search artworks…" style={{ paddingLeft: 36 }} />
        </div>
        <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ width: "auto", minWidth: 130 }}>
          {types.map(t => <option key={t} value={t}>{t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </Select>
        <Select value={sort} onChange={e => setSort(e.target.value)} style={{ width: "auto", minWidth: 140 }}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-high">Price: High → Low</option>
          <option value="price-low">Price: Low → High</option>
        </Select>
        <button onClick={() => setView(v => v === "grid" ? "list" : "grid")} style={{ background: "#1e1e1e", border: "1px solid #2e2e2e", borderRadius: 8, padding: "9px 12px", cursor: "pointer", color: "#aaa" }}>
          <Icon d={view === "grid" ? Icons.list : Icons.grid} size={16} />
        </button>
        <button onClick={load} style={{ background: "#1e1e1e", border: "1px solid #2e2e2e", borderRadius: 8, padding: "9px 12px", cursor: "pointer", color: "#aaa" }}>
          <Icon d={Icons.refresh} size={16} />
        </button>
        <Btn onClick={() => setCreateOpen(true)}><Icon d={Icons.add} size={14} /> New Artwork</Btn>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {[["Total", items.length], ["Filtered", filtered.length], ["Types", new Set(items.map(i => i.type)).size], ["Avg Price", items.length ? "₦" + Math.round(items.reduce((s, i) => s + (Number(i.price) || 0), 0) / items.length).toLocaleString() : "—"]].map(([k, v]) => (
          <div key={k} style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 10, padding: "10px 18px", minWidth: 90 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, color: "#00c896", fontWeight: 700, marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Items */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#555", fontFamily: "'DM Mono', monospace" }}>Loading artworks…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#555", fontFamily: "'DM Mono', monospace" }}>No artworks found</div>
      ) : view === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {filtered.map(item => (
            <div key={item._id} style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#2a2a2a"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e1e"}>
              <div style={{ position: "relative", height: 180, background: "#0d0d0d", overflow: "hidden" }}>
                {item.image && <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)", opacity: 0, transition: "opacity 0.2s", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: 10, gap: 6 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                  <button onClick={() => setViewItem(item)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, padding: "6px 8px", cursor: "pointer", color: "#fff", backdropFilter: "blur(4px)" }}><Icon d={Icons.eye} size={14} /></button>
                  <button onClick={() => setEditItem(item)} style={{ background: "rgba(0,200,150,0.2)", border: "none", borderRadius: 6, padding: "6px 8px", cursor: "pointer", color: "#00c896", backdropFilter: "blur(4px)" }}><Icon d={Icons.edit} size={14} /></button>
                  <button onClick={() => setDeleteItem(item)} style={{ background: "rgba(255,59,71,0.2)", border: "none", borderRadius: 6, padding: "6px 8px", cursor: "pointer", color: "#ff3b47", backdropFilter: "blur(4px)" }}><Icon d={Icons.trash} size={14} /></button>
                </div>
                <span style={{ position: "absolute", top: 8, left: 8, background: "#00c89622", border: "1px solid #00c89644", color: "#00c896", padding: "2px 8px", borderRadius: 20, fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{item.type || "art"}</span>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 13, color: "#e8e8e8", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", marginBottom: 8 }}>{item.author || "—"}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#00c896", fontWeight: 700 }}>{item.price ? `₦${Number(item.price).toLocaleString()}` : "—"}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444" }}>qty: {item.quantity ?? "—"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(item => (
            <div key={item._id} style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 16 }}>
              {item.image && <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 13, color: "#e8e8e8" }}>{item.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555" }}>{item.author} · {item.type}</div>
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#00c896", fontWeight: 700, minWidth: 90, textAlign: "right" }}>{item.price ? `₦${Number(item.price).toLocaleString()}` : "—"}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setViewItem(item)} style={{ background: "#1e1e1e", border: "none", borderRadius: 6, padding: "6px 8px", cursor: "pointer", color: "#aaa" }}><Icon d={Icons.eye} size={14} /></button>
                <button onClick={() => setEditItem(item)} style={{ background: "#1e1e1e", border: "none", borderRadius: 6, padding: "6px 8px", cursor: "pointer", color: "#00c896" }}><Icon d={Icons.edit} size={14} /></button>
                <button onClick={() => setDeleteItem(item)} style={{ background: "#1e1e1e", border: "none", borderRadius: 6, padding: "6px 8px", cursor: "pointer", color: "#ff3b47" }}><Icon d={Icons.trash} size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="CREATE NEW ARTWORK">
        <ArtForm onSubmit={doCreate} loading={saving} />
      </Modal>
      <Modal open={!!editItem} onClose={() => setEditItem(null)} title="EDIT ARTWORK">
        {editItem && <ArtForm initial={editItem} onSubmit={doUpdate} loading={saving} />}
      </Modal>
      <ViewModal open={!!viewItem} item={viewItem} onClose={() => setViewItem(null)} onEdit={setEditItem} onDelete={setDeleteItem} />
      <ConfirmModal open={!!deleteItem} name={deleteItem?.name} onConfirm={doDelete} onCancel={() => setDeleteItem(null)} />
    </div>
  );
};

// ─── USERS TAB ────────────────────────────────────────────────────────────────
const UsersTab = ({ token, addToast }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewUser, setViewUser] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/users/all`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const list = data.users || data;
      setUsers(Array.isArray(list) ? list : []);
    } catch { addToast("Failed to load users", "error"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = users.filter(u =>
    !search || [u.username, u.fullname, u.email, u.auth0Id].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Icon d={Icons.search} size={15} color="#555" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users…" style={{ paddingLeft: 36 }} />
        </div>
        <button onClick={load} style={{ background: "#1e1e1e", border: "1px solid #2e2e2e", borderRadius: 8, padding: "9px 12px", cursor: "pointer", color: "#aaa" }}>
          <Icon d={Icons.refresh} size={16} />
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {[["Total", users.length], ["Paid", users.filter(u => u.hasPaid).length], ["Free", users.filter(u => !u.hasPaid).length]].map(([k, v]) => (
          <div key={k} style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 10, padding: "10px 18px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, color: "#00c896", fontWeight: 700, marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#555", fontFamily: "'DM Mono', monospace" }}>Loading users…</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(u => (
            <div key={u._id} onClick={() => setViewUser(u)} style={{
              background: "#141414", border: "1px solid #1e1e1e", borderRadius: 10, padding: "14px 18px",
              display: "flex", alignItems: "center", gap: 16, cursor: "pointer", transition: "border-color 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#2a2a2a"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e1e"}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", background: "#0d0d0d", flexShrink: 0 }}>
                {u.avatar ? <img src={u.avatar} alt={u.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}><Icon d={Icons.user} size={20} /></div>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 13, color: "#e8e8e8" }}>{u.username || u.fullname || "Anonymous"}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555" }}>{u.email}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {u.hasPaid && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, background: "#00c89622", border: "1px solid #00c89444", color: "#00c896", padding: "2px 8px", borderRadius: 20 }}>PAID</span>}
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444" }}>
                  {u.followerCount ?? (u.followers?.length ?? 0)} followers
                </span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444" }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User detail modal */}
      <Modal open={!!viewUser} onClose={() => setViewUser(null)} title="USER DETAIL">
        {viewUser && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", background: "#0d0d0d" }}>
                {viewUser.avatar ? <img src={viewUser.avatar} alt={viewUser.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#444" }}><Icon d={Icons.user} size={32} /></div>}
              </div>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 17, color: "#e8e8e8" }}>{viewUser.username || viewUser.fullname || "—"}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#555" }}>{viewUser.email}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                ["Auth0 ID", viewUser.auth0Id], ["Full Name", viewUser.fullname], ["Username", viewUser.username],
                ["Paid", viewUser.hasPaid ? "Yes" : "No"], ["Followers", viewUser.followerCount ?? viewUser.followers?.length ?? 0],
                ["Following", viewUser.followingCount ?? viewUser.following?.length ?? 0],
                ["Joined", new Date(viewUser.createdAt).toLocaleDateString()],
              ].map(([k, v]) => v !== undefined && v !== null && v !== "" ? (
                <div key={k} style={{ background: "#1a1a1a", borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 1, marginBottom: 2, textTransform: "uppercase" }}>{k}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#e8e8e8", wordBreak: "break-all" }}>{String(v)}</div>
                </div>
              ) : null)}
            </div>
            {viewUser.bio && (
              <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "10px 14px", marginTop: 10 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 1, marginBottom: 3, textTransform: "uppercase" }}>Bio</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#bbb", lineHeight: 1.6 }}>{viewUser.bio}</div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

// ─── ORDERS TAB ───────────────────────────────────────────────────────────────
const OrdersTab = ({ token, addToast }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/orders`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const list = data.orders || data;
      setOrders(Array.isArray(list) ? list : []);
    } catch { addToast("Failed to load orders (check admin permissions)", "warn"); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = orders
    .filter(o => statusFilter === "all" || o.status === statusFilter)
    .filter(o => !search || [o.reference, o.auth0Id, o.artDetails?.name].join(" ").toLowerCase().includes(search.toLowerCase()));

  const statusColor = { success: "#00c896", pending: "#f59e0b", failed: "#ff3b47" };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Icon d={Icons.search} size={15} color="#555" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders…" style={{ paddingLeft: 36 }} />
        </div>
        <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: "auto", minWidth: 130 }}>
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </Select>
        <button onClick={load} style={{ background: "#1e1e1e", border: "1px solid #2e2e2e", borderRadius: 8, padding: "9px 12px", cursor: "pointer", color: "#aaa" }}>
          <Icon d={Icons.refresh} size={16} />
        </button>
      </div>

      {/* Revenue stats */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          ["Total Orders", orders.length],
          ["Successful", orders.filter(o => o.status === "success").length],
          ["Revenue", "₦" + orders.filter(o => o.status === "success").reduce((s, o) => s + (Number(o.amount) || 0), 0).toLocaleString()],
        ].map(([k, v]) => (
          <div key={k} style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 10, padding: "10px 18px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, color: "#00c896", fontWeight: 700, marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#555", fontFamily: "'DM Mono', monospace" }}>Loading orders…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#555", fontFamily: "'DM Mono', monospace" }}>No orders found</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(o => (
            <div key={o._id || o.reference} style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 16 }}>
              {o.artDetails?.image && <img src={o.artDetails.image} alt={o.artDetails.name} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 13, color: "#e8e8e8" }}>{o.artDetails?.name || "—"}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555" }}>{o.reference}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "#00c896", fontWeight: 700 }}>₦{Number(o.amount).toLocaleString()}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", marginTop: 2 }}>
                  {o.paidAt ? new Date(o.paidAt).toLocaleDateString() : "—"}
                </div>
              </div>
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                background: statusColor[o.status] + "22", border: `1px solid ${statusColor[o.status] + "44"}`, color: statusColor[o.status], textTransform: "uppercase"
              }}>{o.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── MAIN ADMIN PANEL ─────────────────────────────────────────────────────────
const AdminPanel = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState(null);
  const [tab, setTab] = useState("artworks");
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  };
  const removeToast = id => setToasts(t => t.filter(x => x.id !== id));

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({ authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE } })
        .then(setToken).catch(() => addToast("Could not get auth token", "error"));
    }
  }, [isAuthenticated]);

  // ── Styles ──────────────────────────────────────────────────────────────────
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;700&family=DM+Sans:wght@400;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #080808; }
    @keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0d0d0d; }
    ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 3px; }
    input::placeholder { color: #3a3a3a !important; }
  `;

  if (isLoading) return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", color: "#555", fontSize: 13 }}>Authenticating…</div>
      </div>
    </>
  );

  if (!isAuthenticated) return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "#080808", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 24, fontWeight: 700, color: "#e8e8e8", letterSpacing: 2 }}>ADMIN PANEL</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#555" }}>Authentication required to access CRUD controls.</div>
        <Btn onClick={loginWithRedirect}>Login to Continue</Btn>
      </div>
    </>
  );

  const tabs = [
    { id: "artworks", label: "Artworks", icon: Icons.art },
    { id: "users", label: "Users", icon: Icons.user },
    { id: "orders", label: "Orders", icon: Icons.check },
  ];

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "#080808", color: "#e8e8e8", fontFamily: "'DM Sans', sans-serif" }}>

        {/* Header */}
        <header style={{ borderBottom: "1px solid #111", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58, position: "sticky", top: 0, background: "#08080899", backdropFilter: "blur(12px)", zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 13, color: "#00c896", letterSpacing: 3 }}>UNIX ADMIN</div>
            <div style={{ width: 1, height: 20, background: "#1e1e1e" }} />
            <nav style={{ display: "flex", gap: 4 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  background: tab === t.id ? "#00c89618" : "none", border: tab === t.id ? "1px solid #00c89633" : "1px solid transparent",
                  borderRadius: 8, padding: "6px 14px", cursor: "pointer",
                  fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
                  color: tab === t.id ? "#00c896" : "#555", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 7,
                }}>
                  <Icon d={t.icon} size={13} />
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {user?.picture && <img src={user.picture} alt={user.name} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #2a2a2a" }} />}
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555" }}>{user?.email || user?.name}</span>
          </div>
        </header>

        {/* Body */}
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 28 }}>
            <h1 style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 22, color: "#e8e8e8", letterSpacing: 1 }}>
              {tabs.find(t => t.id === tab)?.label}
            </h1>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#444" }}>
              CRUD Management Console
            </span>
          </div>

          {tab === "artworks" && token && <ArtworksTab token={token} addToast={addToast} />}
          {tab === "users"    && token && <UsersTab token={token} addToast={addToast} />}
          {tab === "orders"   && token && <OrdersTab token={token} addToast={addToast} />}
        </main>
      </div>
      <Toast toasts={toasts} remove={removeToast} />
    </>
  );
};

export default AdminPanel;