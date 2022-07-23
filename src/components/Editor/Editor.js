import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css"

export default function Editor({ currentNote, updateNote }) {
    const [selectedTab, setSelectedTab] = React.useState("write")
    
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
        ghMentions: true,
        openLinksInNewWindow: true,
        emoji: true,
        ellipsis: true,
    })  

    return (
        <section className="pane editor">
            <ReactMde
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={90}
                heightUnits="vh"
            />
            <div>
                <span className="last-edit-date">Last Edited On {currentNote.editTime}</span>
            </div>
        </section>
    )
}
