//verileri sayfaya render et
function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem("issues"));

  //Eğer 'issues' null veya undifiend ise, boş bir array olsun
  if (!issues) {
    return; //issues yoksa fonksiyonu sonlandır
  }

  //liste eriş
  const issuesListe = document.getElementById("issuesList");

  //liste içeriği temizle
  issuesListe.innerHTML = "";

  //veri uzunluğuna kadar dön ve parametreleri tanımla
  for (let i = 0; i < issues.length; i++) {
    let id = issues[i].id;
    let desc = issues[i].description;
    let severity = issues[i].severity;
    let assignedTo = issues[i].assignedTo;
    let status = issues[i].status;

    //Status un durumuna göre arka plan değiştir
    let statusClass = status === "Open" ? "bg-info" : "bg-danger";

    // liste içeriği oluştur
    issuesListe.innerHTML += `
    <div class="rounded p-3 border bg-dark-subtle m-4">
      <h6>Issue ID: ${id}</h6>
      <p><span class="${statusClass} p-1 text-light rounded">${status}</span></p>
      <h3>${desc}</h3>
      <div class='d-flex flex-column flex-md-row gap-lg-3 gap-md-3'>
        <p>
          <i class="fa-regular fa-clock"></i>
          <span class="text-capitalize">${severity}</span>
        </p>
        <p>
          <i class="fas fa-user"></i>
          <span class="text-capitalize">${assignedTo}</span>
        </p>
      </div>
      <a href="#" onclick="setStatusClosed('${id}', event)" class="btn btn-warning"
        >Close</a
      >
      <a href="#" onclick="deleteIssue('${id}',event)" class="btn btn-danger ms-2 ms-sm-0">Delete</a>
    </div>`;
  }
}

//form'a id ile eriş ve submit olayını saveIssue fonksiyonu ile izle
document.getElementById("issueForm").addEventListener("submit", saveIssue);

function saveIssue(e) {
  e.preventDefault(); // form yenilenmesini engelle

  //form elemanlarına eriş ve inputlardaki değerleri al
  let issueDesc = document.getElementById("issueDesc").value;
  let issueSeverity = document.getElementById("issueSeverity").value;
  let issueAssignedTo = document.getElementById("issueAssigned").value;
  let issueId = chance.guid(); //benzersiz kimmlik
  let issueStatus = "Open";

  let issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };
  //local boş ise issues a dizi ekle değilse verileri çek
  if (localStorage.getItem("issues") == null) {
    let issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    let issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }
  //formu temizle
  document.getElementById("issueForm").reset();
  //verileri render et
  fetchIssues();
}

//close butonuna tıklandığında çalışacak fonksiyon
function setStatusClosed(id, e) {
  e.preventDefault();

  //localden verileri al ve json a çevir
  const issues = JSON.parse(localStorage.getItem("issues"));

  //veri uzunluğu kadar dön ve close butona tıklayınca statusu değiştir
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }

  //yapılan değişiklikleri locale kaydet
  localStorage.setItem("issues", JSON.stringify(issues));

  //kaydedilen değişiklikleri render et
  fetchIssues();
}

//delete butonuna tıklandığında kaydedilen veriyi silen fonksiyon
function deleteIssue(id, e) {
  e.preventDefault();
  let issues = JSON.parse(localStorage.getItem("issues"));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1); //seçilen issue sil
    }
  }
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}

//Sayfa yüklendiğinde verileri render eden fonksiyonu izle
document.addEventListener("DOMContentLoaded", fetchIssues);
