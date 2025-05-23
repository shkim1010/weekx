function recommendScent() {
  const music = document.getElementById("music").value;
  if (!music.trim()) {
    alert("노래 제목을 입력해주세요.");
    return;
  }

  addBubble(music, "user");

  fetch("https://your-server-url/api/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ song: music })
  })
  .then(response => response.json())
  .then(result => {
    addBubble("분석 완료! 이 노래에 어울리는 향을 추천드릴게요.", "bot");

    const { top, middle, base } = result;

    document.getElementById("result").innerHTML =
      `<p>추천 향조:</p>
       <div class="note-block">
         <h3>Top Note</h3>
         <div class="scent-tags">${top.map(s => `<span class="tag">${s}</span>`).join('')}</div>
       </div>
       <div class="note-block">
         <h3>Middle Note</h3>
         <div class="scent-tags">${middle.map(s => `<span class="tag">${s}</span>`).join('')}</div>
       </div>
       <div class="note-block">
         <h3>Base Note</h3>
         <div class="scent-tags">${base.map(s => `<span class="tag">${s}</span>`).join('')}</div>
       </div>`;
  })
  .catch(error => {
    console.error("에러:", error);
    addBubble("추천에 실패했어요. 다시 시도해주세요.", "bot");
  });
}

function addBubble(text, type) {
  const div = document.createElement("div");
  div.className = `bubble ${type}`;
  div.textContent = text;
  document.getElementById("chat-window").appendChild(div);
}
