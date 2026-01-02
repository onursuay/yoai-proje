# YO Ads Dashboard

iyzads dashboard UI/UX klonu - Next.js App Router projesi.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. `.env.local` dosyası oluşturun:
```bash
cp .env.local.example .env.local
```

3. Meta Access Token'ınızı `.env.local` dosyasına ekleyin.

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Özellikler

- **Meta Ads Entegrasyonu**: `/reklam/meta` sayfasında gerçek Meta API verileri (ads_read permission)
- **Placeholder Sayfalar**: Tüm diğer sayfalar referans görsellere göre placeholder UI
- **Safe Traffic**: Retry, backoff, caching, concurrency=1
- **TypeScript Strict Mode**
- **shadcn/ui + Tailwind CSS**

## Referans Görseller

Referans görseller `/reference/iyzads/` klasöründe yer almalıdır.

