import { useState } from "react";
import {
    Folder,
    FolderOpen,
    FileCode2,
    ShieldAlert,
    ShieldCheck,
    BookOpen,
    Layers,
    ChevronRight,
    CircleDot,
    Sun,
    Moon,
    StickyNote,
} from "lucide-react";
import "../css/Docs.css"

const NAV = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "structure", label: "File structure", icon: Folder },
    { id: "functions", label: "Functions", icon: FileCode2 },
    { id: "security", label: "Security", icon: ShieldAlert },
    { id: "learnings", label: "Learnings", icon: BookOpen },
];

const TREE = [
    {
        name: "server/",
        children: [
            { name: ".env", note: "DB URI + JWT secret — never commit" },
            {
                name: "src/",
                children: [
                    { name: "app.js", note: "Express app setup, middleware wiring" },
                    { name: "server.js", note: "Entry point — starts the HTTP server" },
                    { name: "config/", children: [{ name: "dbConfig.js", note: "Mongoose connection" }] },
                    {
                        name: "controllers/",
                        children: [
                            { name: "userController.js", note: "signup, login, getUser" },
                            { name: "noteController.js", note: "createNote, getNotes, updateNote, delNote" },
                        ],
                    },
                    {
                        name: "middleweres/",
                        children: [
                            { name: "auth.js", note: "verifies JWT, attaches req.user" },
                            { name: "validateMidddlewere.js", note: "runs zod schema on req.body" },
                        ],
                    },
                    {
                        name: "models/",
                        children: [
                            { name: "userModel.js", note: "User schema — email, password, notes[]" },
                            { name: "notesModel.js", note: "Note schema — title, content" },
                        ],
                    },
                    {
                        name: "routes/",
                        children: [
                            { name: "routerIndex.js", note: "mounts /user + /notes routers" },
                            { name: "userRouter.js", note: "signup / login endpoints" },
                            { name: "notesRouter.js", note: "CRUD endpoints for notes" },
                        ],
                    },
                    { name: "utils/", children: [{ name: "jwtGen.js", note: "signs the JWT token" }] },
                    {
                        name: "validators/",
                        children: [
                            { name: "userValidator.js", note: "zod schemas: signup, login" },
                            { name: "noteValidator.js", note: "zod schema: note shape" },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "client/",
        children: [
            {
                name: "src/",
                children: [
                    { name: "main.jsx", note: "React root render" },
                    { name: "App.jsx", note: "routes + top-level user/notes state" },
                    {
                        name: "components/",
                        children: [
                            { name: "UserContext.jsx", note: "context provider for user + notes" },
                            { name: "Login.jsx", note: "login form" },
                            { name: "Signup.jsx", note: "signup form" },
                            { name: "Navbar.jsx", note: "top nav + logout" },
                            { name: "NotesWindow.jsx", note: "maps notes into <List />" },
                            { name: "List.jsx", note: "single note card" },
                            { name: "Controls.jsx", note: "create / update / delete actions" },
                            { name: "Input.jsx", note: "reusable text input" },
                            { name: "Textarea.jsx", note: "reusable textarea" },
                            { name: "docs.jsx", note: "this documentation page" },
                        ],
                    },
                ],
            },
        ],
    },
];

const FUNCTIONS = [
    {
        group: "server/controllers/userController.js",
        items: [
            { name: "signupUser", does: "hashes password with bcrypt, creates the user document" },
            { name: "loginUser", does: "verifies credentials, signs and returns a JWT" },
            { name: "getUser", does: "returns the logged-in user + their populated notes" },
        ],
    },
    {
        group: "server/controllers/noteController.js",
        items: [
            { name: "createNote", does: "creates a note and pushes its id onto the user's notes[]" },
            { name: "getNotes", does: "returns all notes belonging to the current user" },
            { name: "updateNote", does: "edits a note by id — missing an ownership check (see Security)" },
            { name: "delNote", does: "deletes a note by id — missing an ownership check (see Security)" },
        ],
    },
    {
        group: "server/middleweres/auth.js",
        items: [{ name: "auth", does: "reads the JWT from the request, verifies it, attaches req.user" }],
    },
    {
        group: "client/components/Controls.jsx",
        items: [
            { name: "handleCreate", does: "POSTs a new note, updates local notes state" },
            { name: "handleUpdate", does: "PATCHes an edited note" },
            { name: "handleDelete", does: "DELETEs a note by id" },
        ],
    },
];

const LEARNINGS = [
    "React state management for handling dynamic application data, including selected notes, user information, editing state, and synchronizing UI updates with API operations.",

    "React Context API for managing shared application state such as authenticated user data and note-related state across components without unnecessary prop drilling.",

    "React useEffect for handling side effects such as fetching user data, loading notes from the backend, and responding to relevant state changes.",

    "JWT-based authentication with protected Express routes, including token generation, verification through middleware, and maintaining authenticated API requests.",

    "Authentication and authorization as separate security layers, where authentication verifies the user's identity and authorization ensures access is limited to resources owned by that user.",

    "MongoDB and Mongoose for database integration, including schema design, model creation, ObjectId-based relationships between users and notes, and CRUD operations.",

    "Zod-based request validation for enforcing structured input rules at the API boundary before data reaches the application and database layers.",

    "bcrypt for secure password handling, including hashing passwords before storage and comparing hashed credentials during authentication.",

    "Express backend architecture using routes, middleware, controllers, and models to separate API endpoints, request processing, business logic, and database operations.",

]

function TreeNode({ node, depth = 0 }) {
    const [open, setOpen] = useState(depth < 1);
    const isFolder = !!node.children;

    return (
        <div className="docsTreeRow" style={{ marginLeft: depth === 0 ? 0 : 16 }}>
            <div
                className={"docsTreeLine" + (depth > 0 ? " docsTreeLineNested" : "")}
                onClick={() => isFolder && setOpen((o) => !o)}
                style={{ cursor: isFolder ? "pointer" : "default" }}
            >
                {isFolder ? (
                    open ? <FolderOpen size={14} color="var(--primary)" /> : <Folder size={14} color="var(--primary)" />
                ) : (
                    <FileCode2 size={14} color="var(--text-muted)" />
                )}
                <span className={isFolder ? "docsTreeName docsTreeFolder" : "docsTreeName"}>{node.name}</span>
                {node.note && <span className="docsTreeNote">— {node.note}</span>}
            </div>
            {isFolder && open && (
                <div>
                    {node.children.map((child) => (
                        <TreeNode node={child} depth={depth + 1} key={child.name} />
                    ))}
                </div>
            )}
        </div>
    );
}

function SectionHeader({ title, icon: Icon }) {
    return (
        <div className="docsSectionHeader">
            <Icon size={17} color="var(--primary)" />
            <h2>{title}</h2>
        </div>
    );
}

export default function Docs() {
    const [active, setActive] = useState("overview");
    const [theme, setTheme] = useState("light");

    return (
        <div className="docsRoot" data-theme={theme}>
            <div className="docsSidebar">
                <div className="docsSidebarTop">
                    <div className="docsBrand">
                        <StickyNote size={17} color="var(--primary)" />
                        <span></span>
                    </div>
                    <nav className="docsNav">
                        {NAV.map((item) => {
                            const Icon = item.icon;
                            const isActive = active === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActive(item.id)}
                                    className={"docsNavItem" + (isActive ? " docsNavItemActive" : "")}
                                >
                                    <Icon size={15} color={isActive ? "var(--text-highlight)" : "var(--text-muted)"} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
                <button
                    className="docsThemeToggle"
                    onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                >
                    {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
                </button>
            </div>

            <nav className="docsMobileTabs">
                {NAV.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={"docsMobileTab" + (isActive ? " docsMobileTabActive" : "")}
                        >
                            <Icon size={13} color={isActive ? "var(--text-highlight)" : "var(--text-muted)"} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="docsMain">
                {active === "overview" && (
                    <div>
                        <SectionHeader title="Overview" icon={Layers} />
                        <h1 className="docsTitle">Notes App — Project Documentation</h1>
                        <p className="docsParagraph">
                            A full-stack MERN notes application: React + Vite on the client,
                            Express + MongoDB on the server, with JWT-based authentication
                            and Zod request validation. Built to learn React and Express and
                            actively hardened after a self-review turned up a real
                            broken-access-control bug — documented under Security.


                        </p>
                        <p className="docsParagraph">you can visit top right to signup and use the application
                            Please report issue/suggestions on <a style={{ textDecoration: "none", color: "#6e69d3d5" }} href="mailto:anmolraj5767@gmail.com">anmolraj5767@gmail.com</a>

                        </p>
                        <p className="docsParagraph">Get a lot of help from ai to structure and write this docs
                        </p>

                        <div className="docsTagRow">
                            {["React", "Vite", "Express", "MongoDB", "Mongoose", "JWT", "bcrypt", "Zod"].map((tag) => (
                                <span key={tag} className="docsTag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {active === "structure" && (
                    <div>
                        <SectionHeader title="File structure" icon={Folder} />
                        <p className="docsHint">Click a folder to expand or collapse it.</p>
                        <div className="docsTreeBox">
                            {TREE.map((node) => (
                                <TreeNode node={node} depth={0} key={node.name} />
                            ))}
                        </div>
                    </div>
                )}

                {active === "functions" && (
                    <div>
                        <SectionHeader title="Function reference" icon={FileCode2} />
                        <div className="docsFnGroups">
                            {FUNCTIONS.map((group) => (
                                <div key={group.group} className="docsFnGroup">
                                    <div className="docsFnGroupLabel">{group.group}</div>
                                    <div className="docsFnTable">
                                        {group.items.map((fn, i) => (
                                            <div
                                                key={fn.name}
                                                className="docsFnRow"
                                                style={{ background: i % 2 === 0 ? "var(--card-bg)" : "var(--surface)" }}
                                            >
                                                <span className="docsFnName">{fn.name}()</span>
                                                <span className="docsFnDoes">{fn.does}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {active === "security" && (
                    <div>
                        <SectionHeader title="Security" icon={ShieldAlert} />

                        <div className="docsSecurityBox">
                            <div className="docsSecurityHeading docsSecurityDanger">
                                <ShieldAlert size={16} color="var(--danger)" />
                                <span>Known issue — Broken Access Control (IDOR)</span>
                            </div>

                            <p className="docsSecurityText">
                                Currently, <span className="docsInlineHighlight">updateNote</span> and{" "}
                                <span className="docsInlineHighlight">delNote</span> only use the note id
                                and do not verify whether the note belongs to the authenticated user.
                            </p>

                            <div className="docsSecurityHeading docsSecuritySuccess">
                                <ShieldCheck size={16} color="var(--success)" />
                                <span>Fix</span>
                            </div>

                            <p className="docsSecurityText">
                                Add the owner's user id to the Note and, before updating or deleting,
                                compare the note owner's id with <span className="docsInlineHighlight">req.user</span>.
                                Only allow the operation when both ids match; otherwise return{" "}
                                <span className="docsInlineHighlight">403 Forbidden</span>.
                            </p>
                        </div>

                        <div className="docsStatusLine">
                            <CircleDot size={12} color="var(--orange)" />
                            Status: Identified — fix will be implemented in the next milestone.
                        </div>
                    </div>
                )}

                {active === "learnings" && (
                    <div>
                        <SectionHeader title="Learnings log" icon={BookOpen} />
                        <div className="docsLearningsList">
                            {LEARNINGS.map((l, i) => (
                                <div key={i} className="docsLearningRow">
                                    <ChevronRight size={15} color="var(--primary)" />
                                    <p>{l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}