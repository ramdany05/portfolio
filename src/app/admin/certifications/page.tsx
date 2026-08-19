import { createClient } from "@/lib/supabase/server";
import { CertificationsManager } from "./certifications-manager";

export default async function AdminCertificationsPage() {
  const supabase = await createClient();
  const { data: certs } = await supabase
    .from("certifications")
    .select("*")
    .order("order_index", { ascending: true });

  return <CertificationsManager initialCerts={certs || []} />;
}
