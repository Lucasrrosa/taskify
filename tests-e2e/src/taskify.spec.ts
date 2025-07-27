import { expect, test } from '@playwright/test'

const waitForGetRequest = async (page) => {
  const responsePromise = page.waitForResponse(response => 
    response.url().includes('/tasks') && response.status() === 200
  );
  const response = await responsePromise;
  return response
}

const criarTarefa = async (page, titulo) => {
  await page.getByRole('button', { name: 'add' }).click()
  await page.getByRole('textbox', { name: 'Título' }).fill(titulo)
  const createReposnsePromise = page.waitForResponse(response => 
    response.url().includes('/tasks') && response.status() === 201 && response.request().method() === 'POST'
  );
  await page.getByRole('button', { name: 'Criar' }).click()
  await createReposnsePromise;
  await waitForGetRequest(page)

  await expect(page.getByText(titulo)).toBeVisible()
}

const marcarTarefaComoConcluida = async (page, position) => {
  await page.getByRole('checkbox').nth(position).click()
  const updateResponsePromise = page.waitForResponse(response =>
    response.url().includes('/tasks') && response.status() === 200 && response.request().method() === 'PATCH'
  )
  await updateResponsePromise
  await expect(page.getByRole('checkbox').nth(position)).toBeChecked()
}
test.describe('Fluxo de registro e autenticação', () => {
  test('Bloqueio de acesso para rotas privadas sem autenticação', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page).toHaveURL('http://localhost:5173/login');
  });
  
  test('Registro de usuário', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByRole('link', { name: 'Don\'t have an account?' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('teste@email.com');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('Teste da Silva');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('passwordtesting');
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/auth/register') && response.status() === 201
    );
    await page.getByRole('button', { name: 'Register' }).click();
  
    await responsePromise;
    await expect(page).toHaveURL('http://localhost:5173/login');
  });
  
  test('Login com sucesso', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[name="email"]', 'teste@email.com');
    await page.fill('input[name="password"]', 'passwordtesting');
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/auth/login') && response.status() === 200
    );
    await page.click('button[type="submit"]');
    const response = await responsePromise;
    const responseData = await response.json();
    expect(responseData).toHaveProperty('accessToken');
    expect(responseData).toHaveProperty('user');
    await expect(page).toHaveURL('http://localhost:5173');
  });
})

test.describe('Fluxo autenticado', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.fill('input[name="email"]', 'teste@email.com');
    await page.fill('input[name="password"]', 'passwordtesting');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:5173');
  });
  test('Criação de nova tarefa', async ({ page }) => {
    const title = `Nova tarefa ${new Date().toISOString()}`;
    const description = `Descrição da tarefa de teste ${new Date().toISOString()}`;
    await page.getByRole('button', { name: 'add' }).click();
    await page.getByRole('textbox', { name: 'Título' }).fill(title);
    await page.getByRole('textbox', { name: 'Descrição' }).fill(description);
    await page.getByRole('button', { name: 'Criar' }).click();

    await expect(page.getByText(title)).toBeVisible();
    await expect(page.getByText(description)).toBeVisible();
  });
  test('Marcar tarefa como concluída', async ({ page }) => {
    await expect(page.getByRole('checkbox').first()).not.toBeChecked();
    await page.getByRole('checkbox').first().click();
    const updateResponsePromise = page.waitForResponse(response => 
      response.url().includes('/tasks') && response.status() === 200 && response.request().method() === 'PATCH'
    );
    await updateResponsePromise;
    await expect(page.getByRole('checkbox').first()).toBeChecked();
    console.log('done')
  });
  test('Exclusão de tarefa', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/tasks') && response.status() === 200
    );
    const response = await responsePromise;
    const responseData = await response.json();
    expect((await page.getByRole('checkbox').all()).length).toBe(responseData.length);
    await page.getByRole('button', { name: 'delete' }).first().click();
    const deleteResponsePromise = page.waitForResponse(response => 
      response.url().includes('/tasks') && response.status() === 200 && response.request().method() === 'DELETE'
    );
    await deleteResponsePromise;

    const getallResponse = page.waitForResponse(response => 
      response.url().includes('/tasks') && response.status() === 200
    );
    await getallResponse;
    expect((await page.getByRole('checkbox').all()).length).toBe(responseData.length - 1);
  });

  test('Filtro por status (pendente/concluída)', async ({ page }) => {   
    await criarTarefa(page, 'Tarefa um');
    await criarTarefa(page, 'Tarefa dois');
    await expect(page.getByText('Tarefa um')).toBeVisible();
    await expect(page.getByText('Tarefa dois')).toBeVisible();
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'In Progress' }).click();
    await expect(page.getByText('Tarefa um')).toBeVisible();
    await expect(page.getByText('Tarefa dois')).toBeVisible();
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'All' }).click();
    await marcarTarefaComoConcluida(page, 0);
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'In Progress' }).click();
    await expect(page.getByText('Tarefa um')).toBeVisible();
    await expect(page.getByText('Tarefa dois')).not.toBeVisible();
    await page.getByRole('combobox').click();
    await page.getByText('Done').click();
    await expect(page.getByText('Tarefa um')).not.toBeVisible();
    await expect(page.getByText('Tarefa dois')).toBeVisible();
  });
  

  test('Validações de formulário (ex: campos obrigatórios)', async ({ page }) => {
    await page.getByRole('button', { name: 'add' }).click();
    await page.getByRole('button', { name: 'Criar' }).click();
    await expect(page.getByText('Title is required')).toBeVisible()
  });
  

})
