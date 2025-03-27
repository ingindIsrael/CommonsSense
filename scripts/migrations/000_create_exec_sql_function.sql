-- Create function to execute dynamic SQL
CREATE OR REPLACE FUNCTION exec_sql(sql_string text)
RETURNS void AS
$$
BEGIN
  EXECUTE sql_string;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION exec_sql(text) TO service_role; 