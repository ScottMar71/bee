type FileChange = {
  path: string;
  content: string;
  encoding?: "utf-8" | "base64";
};

function repoConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "ScottMar71/bee";
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return { token, repo, branch };
}

async function github<T>(url: string, init?: RequestInit): Promise<T> {
  const { token } = repoConfig();
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub ${res.status}: ${body}`);
  }
  return (await res.json()) as T;
}

export async function commitFiles(files: FileChange[], message: string) {
  const { repo, branch } = repoConfig();

  for (const file of files) {
    const url = `https://api.github.com/repos/${repo}/contents/${file.path}`;
    let sha: string | undefined;
    try {
      const existing = await github<{ sha: string }>(`${url}?ref=${branch}`);
      sha = existing.sha;
    } catch {
      sha = undefined;
    }

    const content =
      file.encoding === "base64"
        ? file.content
        : Buffer.from(file.content, "utf8").toString("base64");

    await github(url, {
      method: "PUT",
      body: JSON.stringify({
        message,
        content,
        sha,
        branch,
      }),
    });
  }
}

export async function deleteGithubFile(filePath: string, message: string) {
  const { repo, branch } = repoConfig();
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const existing = await github<{ sha: string }>(`${url}?ref=${branch}`);
  await github(url, {
    method: "DELETE",
    body: JSON.stringify({
      message,
      sha: existing.sha,
      branch,
    }),
  });
}
