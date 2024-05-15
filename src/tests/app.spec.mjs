import request from 'supertest';
import app from '../app.mjs';

describe('app test', () => {
  it('should return a 200 status code and a message Lorenzo', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Lorenzo');
  });

  it('should return a 404 status code', async () => {
    const response = await request(app).get('/route/inexistante');
    expect(response.status).toBe(404);
  });
});

describe('app markdown test', () => {
  it('should return a 200 status code and simple html corresponding to md', async () => {
    const body = {
      markdown: '# Titre\n\nSalut tout le monde',
    };

    const response = await request(app).post('/markdown/toHtml').send(body);
    expect(response.status).toBe(200);
    expect(response.body.html).toBe('\n<h1 id="titre">Titre</h1>\n<p>Salut tout le monde</p>\n');
  });

  it('should return a 200 status code and formatted html corresponding to md', async () => {
    const body = {
      markdown:
        "## Téléchargement\n\nL'executable et les dlls sont disponibles sur le FTP dans le répertoire **Outils/extraction_document**\n\n::: tip\nIl est conseillé de passer par DeployerOutils. En un seul clic vous pouvez télécharger l'executable et le positionner dans le répertoire choisi.\n:::",
    };

    const response = await request(app).post('/markdown/toHtml').send(body);
    expect(response.status).toBe(200);
    expect(response.body.html).toBe(
      '\n<h2 id="téléchargement">Téléchargement</h2>\n<p>L\'executable et les dlls sont disponibles sur le FTP dans le répertoire <strong>Outils/extraction_document</strong></p>\n<div class="tip">\n  <p>Il est conseillé de passer par DeployerOutils. En un seul clic vous pouvez télécharger l\'executable et le positionner dans le répertoire choisi.</p>\n</div>\n'
    );
  });
});
